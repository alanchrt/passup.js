function Parameters() {
	this.passwords = null;
	this.adapters = null;

	this.loadCli();
}

Parameters.create = function() {
	return new Parameters();
}

Parameters.prototype.loadCli = function() {
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
	if (this.passwords) {
		return !(this.passwords.indexOf(password) === -1);
	}
	return true;
};

Parameters.prototype.isSpecifiedAdapter = function(adapter) {
	if (this.adapters) {
		return !(this.adapters.indexOf(adapter) === -1);
	}
	return true;
};

module.exports = Parameters;
