casper = require('casper').create();

// Passup
//-----------------------------------------------

function Passup(config) {
    // Initialize application
    this.config = config;
    this.adapters = [];
    this.updateQueue = [];

    // Supply Google Chrome user agent
    casper.userAgent('Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/28.0.1468.0 Safari/537.36');
}

Passup.prototype.loadAdapters = function() {
    // Load the adapters for sites in the user configuration
};

Passup.prototype.bindErrors = function() {
    // Override the default error handling behavior
};

Passup.prototype.bindSteps = function() {
    // Display dots after the completion of each step
};

Passup.prototype.run = function() {
    // Run the application
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
    // Update this adapter with the new password
};
