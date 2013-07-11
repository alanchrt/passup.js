casper = require('casper').create();
colorizer = require('colorizer').create('Colorizer');

// Patch require to allow module import
require = patchRequire(require, ['./modules']);

// Import the user configuration
try {
    configData = require('./modules/configData').load('./config.json');
} catch(e) {
    casper.echo("Error parsing the configuration file. Check that the file exists and is valid JSON.", 'ERROR');
    casper.exit();
}

// Import passup.js core
passup = require('./modules/passup').create(configData);

// Supply Google Chrome user agent
casper.userAgent('Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) ' +
                 'Chrome/28.0.1468.0 Safari/537.36');

// Run passup.js
passup.run();
