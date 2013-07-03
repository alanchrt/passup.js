casper = require('casper').create();
colorizer = require('colorizer').create('Colorizer');

// Patch require, import config and core
require = patchRequire(require, ['./modules']);
config = require('./config').config;
passup = require('./modules/passup').create(config, colorizer);

// Supply Google Chrome user agent
casper.userAgent('Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) ' +
                 'Chrome/28.0.1468.0 Safari/537.36');
// Run passup.js
passup.run();
