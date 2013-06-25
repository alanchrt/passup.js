exports.adapter = {
    "name": "eBay",
    "passwordRegExp": /^.{6,20}$/, // 6-20 characters, dissimilar from email address
    "update": function(data) {
        casper.start('https://signin.ebay.com/ws/eBayISAPI.dll');

        casper.then(function() {
            this.fill('form#SignInForm', {
                'userid': data.site.login,
                'pass': data.oldPassword
            }, true);
        });

        casper.then(function() {
            this.open('http://signin.ebay.com/ws/eBayISAPI.dll?ChangePasswordAndCreateHint');
        });

        casper.then(function() {
            this.fill('form#SignInForm', {
                'userid': data.site.login,
                'pass': data.oldPassword
            }, true);
        });

        casper.then(function() {
            this.fill('form[name="ChangePassword"]', {
                'opass': data.oldPassword,
                'npass': data.newPassword,
                'rpass': data.newPassword
            }, true);
        });
    }
};
