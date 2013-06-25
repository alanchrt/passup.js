exports.adapter = {
    "name": "Reddit",
    "passwordRegExp": /^.*$/,
    "update": function(data) {
        casper.start('http://www.reddit.com/');

        casper.then(function() {
            this.fill('form#login_login-main', {
                'user': data.site.login,
                'passwd': data.oldPassword
            }, true);
        });

        casper.then(function() {
            this.open('https://ssl.reddit.com/prefs/update/');
        });

        casper.then(function() {
            this.fill('form#pref-update', {
                'curpass': data.oldPassword,
                'newpass': data.newPassword,
                'verpass': data.newPassword
            });
        });

        casper.then(function() {
            this.click('button[type="submit"]');
            this.wait(3000);
        });
    }
};
