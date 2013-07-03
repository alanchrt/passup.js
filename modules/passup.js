casper = require('casper').create();
colorizer = require('colorizer').create('Colorizer');

// Patch require to allow custom modules
require = patchRequire(require, ['./adapters']);
io = require('./io').create();

// Passup
//-----------------------------------------------

function Passup(config) {
    // Initialize application
    this.config = config;
    this.adapters = {};
    this.updateQueue = [];
    this.updateCount = 0;
    this.siteCount = 0;
    this.hasError = false;

    // Supply Google Chrome user agent
    casper.userAgent('Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) ' +
                     'Chrome/28.0.1468.0 Safari/537.36');

    // Set up imports and bindings
    this.loadAdapters();
    this.bindErrors();
    this.bindSteps();
}

Passup.prototype.loadAdapters = function() {
    // Load the adapters for sites in the user configuration
    for (i in this.config.passwords) {
        var password = this.config.passwords[i];
        for (j in password.sites) {
            var site = password.sites[j];
            if (!(site.adapter in adapters))
                this.adapters[site.adapter] = require('./adapters/' + site.adapter).adapter;
        }
    }
};

Passup.prototype.bindErrors = function() {
    // Override the default error handling behavior
    var obj = this;
    phantom.onError = function(msg, backtrace) {
        // Show the error
        obj.hasError = true;
        io.say([{
            text: "\n" + msg,
            style: 'RED_BAR'
        }]);
        io.print("\n");

        // Clear all the remaining steps
        casper.steps = function() {};
    };
};

Passup.prototype.bindSteps = function() {
    // Display dots after the completion of each step
    casper.on('step.complete', function(resource) {
        system.stdout.write('.');
    });
};

Passup.prototype.getOldPassword = function(password) {
    // Ask for the old password by name
    return io.ask([
        {
            text: "Old password "
        },
        {
            text: password.name,
            style: 'PARAMETER'
        },
        {
            text: ":"
        }
    ]);
};

Passup.prototype.getNewPassword = function(password) {
    // Ask for the new password by name
    var newPassword =  io.ask([
        {
            text: "New password "
        },
        {
            text: name,
            style: 'PARAMETER'
        },
        {
            text: ":"
        }
    ]);
};

Passup.prototype.checkRegExp = function(password, sites) {
    // Verify that the password matches the regexp for all sites
    var matching = true;
    for (i in sites) {
        var site = sites[i];
        var adapter = this.adapters[site.adapter];
        if (!password.match(adapter.passwordRegExp)) {
            // Print warning
            io.say([
                {
                    text: "Password does not match " + adapter.name + " regexp ",
                    style: 'WARNING'
                },
                {
                    text: adapter.passwordRegExp.toString(),
                    style: 'PARAMETER'
                },
                {
                    text: ".",
                    style: 'WARNING'
                }
            ]);
            matching = false;
        }
    }
    if (!matching)
        io.print("\n");
    return matching;
};

Passup.prototype.requestUpdates = function() {
    // Retrieve updated passwords
    for (i in this.config.passwords) {
        var password = this.config.passwords[i];
        var oldPassword = this.getOldPassword(password);

        // Ask for new password until it matches site regexps
        do {
            var newPassword = this.getNewPassowrd(password.name);
        } while (!this.checkRegExp(newPassword, password.sites));
    }
};

Passup.prototype.enqueueUpdates = function(oldPassword, newPassword, sites) {
    // Create a password update for each of the sites and enqueue it
    for (i in sites) {
        var site = sites[i];

        var update = new PasswordUpdate();
        update.site = site;
        update.adapter = this.adapters[site.adapter];
        update.oldPassword = oldPassword;
        update.newPassword = newPassword;

        this.updateQueue.push(update);
    }
};

Passup.prototype.updateNext = function() {
    // Update the next password in the queue
};

Passup.prototype.finish = function() {
    // Print totals
    io.say([{
        text: "Finished updating " + this.updateCount + " password(s) on " + this.siteCount + " site(s).",
        style: 'INFO_BAR'
    }]);

    // End execution
    casper.exit();
    return;
};

Passup.prototype.run = function() {
    // Run the application
    io.say([{
        text: "Passup.js -- version 0.1.0\n",
        style: 'COMMENT'
    }]);
};


// PasswordUpdate
//-----------------------------------------------

function PasswordUpdate() {
    // Initialize update object
    this.site = {};
    this.adapter = {};
    this.oldPassword = '';
    this.newPassword = '';
}

PasswordUpdate.prototype.update = function(data) {
    // Update this adapter with the supplied data
    this.adapter.update(data);
};


// Export the api
exports.Passup = Passup;
