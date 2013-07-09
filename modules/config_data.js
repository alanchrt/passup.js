fs = require('fs');

// ConfigData
//-----------------------------------------------

function ConfigData(rawData, cleanData) {
	this.rawData = rawData;
	this.cleanData = cleanData;
}

ConfigData.load = function(filePath) {
	configJson = fs.read(filePath);
	// load the json twice to make two deep copies.
	rawData = JSON.parse(configJson);
	cleanData = JSON.parse(configJson);

	return new ConfigData(rawData, cleanData);
};

ConfigData.prototype.filterParams = function(params) {
	// filter passwords based on command line arguments
	if (params.passwords) {
		this.cleanData.passwords = this.cleanData.passwords.filter(
			function(password, index, passwords) {
				return params.isSpecifiedPassword(password.name);
			}, params);
	}
	// filter sites based on command line arguments
	if (params.adapters) {
		this.cleanData.passwords.forEach(function(password, index, passwords) {
			password.sites = password.sites.filter(function(site, index, sites) {
				return params.isSpecifiedAdapter(site.adapter);
			});
		});
	}
	// remove passwords that have no sites to update
	this.cleanData.passwords = this.cleanData.passwords.filter(
		function(password, index, passwords) {
			return (password.sites.length > 0);
		});
};

module.exports = ConfigData;