fs = require('fs');

// ConfigData
//-----------------------------------------------

function ConfigData(rawData, cleanData) {
	this.rawData = rawData;
	this.cleanData = cleanData;
}

ConfigData.load = function(filePath) {
	configJson = fs.read(filePath);
	rawData = JSON.parse(configJson);
	cleanData = JSON.parse(configJson);

	return new ConfigData(rawData, cleanData);
};

ConfigData.prototype.filterParams = function(params) {
	if (params.passwords) {
		this.cleanData.passwords = this.cleanData.passwords.filter(
			function(password, index, passwords) {
				return params.isSpecifiedPassword(password.name);
			}, params);
	}
	if (params.adapters) {
		this.cleanData.passwords.forEach(function(password, index, passwords) {
			password.sites = password.sites.filter(function(site, index, sites) {
				return params.isSpecifiedAdapter(site.adapter);
			});
		});
	}
	this.cleanData.passwords = this.cleanData.passwords.filter(
		function(password, index, passwords) {
			return (password.sites.length > 0);
		});
};

module.exports = ConfigData;