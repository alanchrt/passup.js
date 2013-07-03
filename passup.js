system = require('system');
colorizer = require('colorizer').create('Colorizer');
casper = require('casper').create();

// Patch require and import config
require = patchRequire(require, ['./adapters']);
config = require('./config').config;

// Look for command line arguments
var passwordGroup = null;
if (casper.cli.has('password')) {
    passwordGroup = casper.cli.get('password');
}

// Require and store adapters
adapters = {}
for (i in config.passwords) {
    var password = config.passwords[i];
    for (j in password.sites) {
        var site = password.sites[j];
        if (!(site.adapter in adapters))
            adapters[site.adapter] = require('./adapters/' + site.adapter).adapter;
    }
}

// Error flag (definitely need to namespace this stuff)
error = false;

// Set the user agent to something normal
casper.userAgent('Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/28.0.1468.0 Safari/537.36');

// Create an empty queue for updates
update_queue = [];

// Individual password update object
function PasswordUpdate() {
    this.site = {};
    this.adapter = {};
    this.oldPassword = '';
    this.newPassword = '';
}

// Greeting
casper.echo("Passup.js -- version 0.1.0\n", 'COMMENT');

// Request password changes for each password
for (i in config.passwords) {
    var password = config.passwords[i];
    
    // check if we want to update this password group
    if (passwordGroup != null && password.name != passwordGroup) {
        continue;
    }

    // Request old password
    casper.echo("Old password " + colorizer.colorize(password.name, 'PARAMETER') + ":");
    var oldPassword = system.stdin.readLine().trim();
    
    do {
        // Request new password
        var matching = true;
        casper.echo("New password " + colorizer.colorize(password.name, 'PARAMETER') + ":");
        var newPassword = system.stdin.readLine().trim();
        
        // Check regular expressions
        for (j in password.sites) {
            var site = password.sites[j];
            var adapter = adapters[site.adapter];
            if (!newPassword.match(adapter.passwordRegExp)) {
                casper.echo(colorizer.colorize("Password does not match " + adapter.name + " regexp ", 'WARNING') +
                            colorizer.colorize(adapter.passwordRegExp.toString(), 'PARAMETER') +
                            colorizer.colorize(".", 'WARNING'));
                matching = false;
            }
        }
        if (!matching) system.stdout.write("\n");
    } while (!matching);
    system.stdout.write("\n")

    // Add updates to the queue
    for (j in password.sites) {
        var site = password.sites[j];
        var adapter = adapters[site.adapter];

        var update = new PasswordUpdate();
        update.site = site;
        update.adapter = adapter;
        update.oldPassword = oldPassword;
        update.newPassword = newPassword;

        update_queue.push(update);
    }
}

// Recursive update method
update = function() {
    // Exit on empty queue
    if (update_queue.length == 0) {
        // Print totals
        var password_count = config.passwords.length;
        var site_count = 0;
        for (i in config.passwords) site_count += config.passwords[i].sites.length;
        casper.echo("Finished updating " + password_count + " password(s) on " + site_count + " site(s).", 'INFO_BAR');

        // End execution
        casper.exit();
        return;
    }

    // Get the next update
    var current_update = update_queue.shift();
    casper.echo(colorizer.colorize("UPDATING ", 'COMMENT') +
                colorizer.colorize(current_update.adapter.name, 'PARAMETER'));

    // Set up data
    var data = {
        site: current_update.site,
        oldPassword: current_update.oldPassword,
        newPassword: current_update.newPassword
    };

    // Run the adapter update method
    error = false;
    current_update.adapter.update(data);

    // Capture a screenshot
    casper.then(function() {
        this.capture('output.png');
    });

    // Run casper
    casper.run(function() {
        if (!error)
            casper.echo("\nDone.\n", 'INFO');
        update();
    });
}

// Show dots as steps are completed
casper.on('step.complete', function(resource) {
    system.stdout.write('.');
});

// Capture a screenshot after all errors
phantom.onError = function(msg, backtrace) {
    error = true;
    casper.echo("\n" + msg, 'RED_BAR');
    system.stdout.write("\n");
    casper.steps = function() {};
    casper.capture('error.png');
};

// Update the passwords
update();
