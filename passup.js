system = require('system');
casper = require('casper').create();
require = patchRequire(require, ['./adapters']);
config = require('./config').config;
fs = require('fs'); //phantomjs file system module
// Set the user agent to something normal
casper.userAgent('Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/28.0.1468.0 Safari/537.36');

// Create an empty queue for updates
var update_queue = [];

// Individual password update object
function PasswordUpdate() {
    this.site = {};
    this.adapter = {};
    this.oldPassword = '';
    this.newPassword = '';
}

// Greeting
console.log("Passup.js -- version 0.1.0\n");

// Request password changes for each password
for (i in config.passwords) {
    // Request old password
    var password = config.passwords[i];
    system.stdout.write("Old \"" + password.name + "\" password: ");
    var oldPassword = system.stdin.readLine().trim();
    
    do {
        // Request new password
        var matching = true;
        system.stdout.write("New \"" + password.name + "\" password: ");
        var newPassword = system.stdin.readLine().trim();
        system.stdout.write("\n");
        
        // Check regular expressions
        for (j in password.sites) {
            var site = password.sites[j];
            var adapter = require('./adapters/' + site.adapter).adapter;
            if (!newPassword.match(adapter.passwordRegExp)) {
                console.log("Password does not match " + adapter.name + " regexp " + adapter.passwordRegExp.toString() + ".");
                matching = false;
            }
        }
    } while (!matching);

    // Add updates to the queue
    for (j in password.sites) {
        var site = password.sites[j];
        var adapter = require('./adapters/' + site.adapter).adapter;

        var update = new PasswordUpdate();
        update.site = site;
        update.adapter = adapter;
        update.oldPassword = oldPassword;
        update.newPassword = newPassword;

        update_queue.push(update);
    }
}

// Recursive update method
var update = function() {
    // Exit on empty queue
    if (update_queue.length == 0) {
        casper.exit();
        return;
    }

    // Get the next update
    var current_update = update_queue.shift();
    console.log("Updating " + current_update.adapter.name + "...");

    // Set up data
    var data = {
        site: current_update.site,
        oldPassword: current_update.oldPassword,
        newPassword: current_update.newPassword
    };

    //prepare screenshot name and create directories if neccessary
    var dt = new Date();
    var img_folder_name = "screenshots/"+dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate();
    var full_image_name = img_folder_name+"/"+current_update.site.adapter+".png";
    if(!fs.isDirectory(img_folder_name)){
        fs.makeTree(img_folder_name)
    }
    console.log(full_image_name);

    // Run the adapter update method
    current_update.adapter.update(data);

    // Capture a screenshot
    casper.then(function() {
        this.capture(full_image_name);
    });

    // Run casper
    casper.run(function() {
        console.log("Done.\n");
        update();
    });
}

// Update the passwords
update();
