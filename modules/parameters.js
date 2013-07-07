// Parameters
//-----------------------------------------------

function Parameters() {
    this.passwords = null;
    this.adapters = null;

    this.loadCli();
}

Parameters.create = function() {
    // Instantiate a new object
    return new Parameters();
}

Parameters.prototype.loadCli = function() {
    // load cli options
    if (casper.cli.has('password')) {
        this.passwords = casper.cli.get('password').split(',').map(function(password) {
            return password.trim();
        });
    }
    if (casper.cli.has('adapter')) {
        this.adapters = casper.cli.get('adapter').split(',').map(function(adapter) {
            return adapter.trim();
        });
    }
};

Parameters.prototype.isSpecifiedPassword = function(password) {
    // returns true if the password was specified as a command line option
    // also returns true if no specific passwords were specified on the command line.
    if (this.passwords) {
        return !(this.passwords.indexOf(password) === -1);
    }
    return true;
};

Parameters.prototype.isSpecifiedAdapter = function(adapter) {
    // returns true if the adapter was specified as a command line option
    // also returns true if no specific adapters were specified on the command line.
    if (this.adapters) {
        return !(this.adapters.indexOf(adapter) === -1);
    }
    return true;
};

// Export the api
module.exports = Parameters;
