// Passup
//-----------------------------------------------

function Passup(config, params) {
    // Initialize application
    this.config = config;
    this.params = params;
    this.adapters = {};
    this.updateQueue = [];
    this.updateCount = 0;
    this.siteCount = 0;
    this.hasError = false;
    this.io = require('./modules/io').create();

    // Set up imports and bindings
    this.loadAdapters();
    this.bindErrors();
    this.bindSteps();
}

Passup.create = function(config, params) {
    // Create a new passup object
    return new Passup(config, params);
};

Passup.prototype.loadAdapters = function() {
    // Load the adapters for sites in the user configuration
    for (var i in this.config.passwords) {
        var password = this.config.passwords[i];
        for (var j in password.sites) {
            var site = password.sites[j];
            if (!(site.adapter in this.adapters))
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
        obj.io.say([{
            text: "\n" + msg,
            style: 'RED_BAR'
        }]);
        obj.io.print("\n");

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
    return this.io.ask([
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
    return this.io.ask([
        {
            text: "New password "
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

Passup.prototype.checkRegExp = function(password, sites) {
    // Verify that the password matches the regexp for all sites
    var matching = true;
    for (var i in sites) {
        var site = sites[i];
        var adapter = this.adapters[site.adapter];
        if (!password.match(adapter.passwordRegExp)) {
            // Print warning
            this.io.say([
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
        this.io.print("\n");
    return matching;
};

Passup.prototype.requestUpdates = function() {
    // Retrieve updated passwords
    for (var i in this.config.passwords) {
        var password = this.config.passwords[i];

        // Exclude if password list was specified
        if (!this.params.isSpecifiedPassword(password.name)) continue;

        // Get the old password
        var oldPassword = this.getOldPassword(password);

        // Ask for new password until it matches site regexps
        var newPassword = '';
        do {
            newPassword = this.getNewPassword(password);
        } while (!this.checkRegExp(newPassword, password.sites));
        this.io.print("\n");

        // Enqueue updates for each site listed in the password
        this.enqueueUpdates(oldPassword, newPassword, password.sites);
    }
};

Passup.prototype.enqueueUpdates = function(oldPassword, newPassword, sites) {
    // Create a password update for each of the sites and enqueue it
    for (var i in sites) {
        var site = sites[i];

        if (!this.params.isSpecifiedAdapter(site.adapter)) continue;

        var update = new PasswordUpdate();
        update.site = site;
        update.adapter = this.adapters[site.adapter];
        update.oldPassword = oldPassword;
        update.newPassword = newPassword;

        this.updateQueue.push(update);
        this.siteCount ++;
    }
};

Passup.prototype.updateNext = function() {
    // Update the next password in the queue
    if (this.updateQueue.length === 0) {
        this.finish();
        return false;
    }

    // Get the next one and update it
    var update = this.updateQueue.shift();
    this.io.say([
        {
            text: "UPDATING ",
            style: 'COMMENT',
        },
        {
            text: update.adapter.name,
            style: 'PARAMETER'
        }
    ]);
    this.hasError = false;
    update.update();

    // Prevent early termination
    casper.then(function() {});

    // Run the steps set up in the adapter
    var obj = this;
    casper.run(function() {
        if (!obj.hasError) {
            obj.updateCount ++;
            obj.io.say([{
                text: "\nDone\n",
                style: 'INFO'
            }]);
        }
        obj.updateNext();
    });
};

Passup.prototype.finish = function() {
    // Print totals
    this.io.say([{
        text: "Finished updating " + this.updateCount + " password(s) on " + this.siteCount + " site(s).",
        style: 'INFO_BAR'
    }]);

    // End execution
    casper.exit();
};

Passup.prototype.run = function() {
    // Run the application
    this.io.say([{
        text: "Passup.js -- version 0.1.0\n",
        style: 'COMMENT'
    }]);

    // Retrieve new passwords
    this.requestUpdates();
    this.updateNext();
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

PasswordUpdate.prototype.update = function() {
    // Update this adapter with the supplied data
    this.adapter.update({
        site: this.site,
        oldPassword: this.oldPassword,
        newPassword: this.newPassword
    });
};


// Export the api
module.exports = Passup;
