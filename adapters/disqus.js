exports.adapter = {
    "name": "Disqus",
    "passwordRegExp": /^.*$/,
    "update": function(data) {
        casper.start('https://disqus.com/profile/login/');

        casper.then(function() {
            this.fill('form#login-form', {
                'username': data.site.login,
                'password': data.oldPassword
            }, true);
        });

        casper.then(function() {
            this.open('http://disqus.com/embed/account/');
        });

        casper.then(function() {
            this.click('.changePasswordField a:first-child');
        });

        casper.then(function() {
            this.fill('.changePasswordField', {
                'old_password': data.oldPassword,
                'password': data.newPassword
            });
        });

        casper.then(function() {
            this.click('.form-actions button[type="submit"]');
        });
    }
};
