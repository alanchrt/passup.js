casper = require('casper').create();
require = patchRequire(require, ['./adapters']);
config = require('./config').config;

// Set the user agent to something normal
casper.userAgent('Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1)');

// Iterate through password groups
for (i in config.passwords) {
    var password = config.passwords[i];
    console.log("\nSetting \"" + password.name + "\" password...\n");

    // Iterate over sites that use the password
    for (j in password.sites) {
        // Load the site adapter
        var site = password.sites[j];
        adapter = require('./adapters/' + site.adapter).adapter;
        console.log("Updating " + adapter.name + "...");

        // Add steps to stack
        casper.start(adapter.start);
        for (k in adapter.steps) {
            casper.then(function() {
                adapter.steps[k](this, site);
            });
        }

        // Capture a screenshot
        casper.then(function() {
            this.capture('output.png');
        });

        // Run casper
        casper.run();
        console.log("Done.\n");
    }
}
