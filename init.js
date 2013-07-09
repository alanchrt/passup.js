casper = require('casper').create();
colorizer = require('colorizer').create('Colorizer');

// Patch require, import config and core
require = patchRequire(require, ['./modules']);
configData = require('./modules/config_data').load('./config.json');
passup = require('./modules/passup').create(configData);

// Supply Google Chrome user agent
casper.userAgent('Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) ' +
                 'Chrome/28.0.1468.0 Safari/537.36');

// Run passup.js
passup.run();
