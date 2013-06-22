system = require('system');
casper = require('casper').create();
require = patchRequire(require, ['./adapters']);
config = require('./config').config;

// Set the user agent to something normal
casper.userAgent('Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/28.0.1468.0 Safari/537.36');

// Iterate through password groups
for (i in config.passwords) {
    var password = config.passwords[i];
    console.log("\nSetting \"" + password.name + "\" password...\n");

    // Request password
    system.stdout.write("Old password: ");
    var oldPassword = system.stdin.readLine().trim();
    system.stdout.write("New password: ");
    var newPassword = system.stdin.readLine().trim();
    system.stdout.write("\n");

    // Iterate over sites that use the password
    for (j in password.sites) {
        // Load the site adapter
        var site = password.sites[j];
        adapter = require('./adapters/' + site.adapter).adapter;
        console.log("Updating " + adapter.name + "...");

        // Set up data
        var data = {
            site: site,
            oldPassword: oldPassword,
            newPassword: newPassword
        };

        // Run the adapter update method
        adapter.update(data);

        // Capture a screenshot
        casper.then(function() {
            this.capture('output.png');
        });

        // Run casper
        casper.run(function() {
            console.log("Done.\n");
            this.exit();
        });
    }
}

console.log("Finished updating.\n");
