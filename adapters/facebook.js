exports.adapter = {
    "name": "Facebook",
    "passwordRegExp": /\w/,
    "update": function(data) {
        casper.start('https://www.facebook.com/');

        casper.then(function() {
            this.fill('form#login_form', {
                'email': data.site.login,
                'pass': data.oldPassword
            }, true);
        });

        casper.then(function() {
            this.open('https://www.facebook.com/settings?tab=account&section=password&view');
        });

        casper.then(function() {
            this.fill('form[action="/ajax/settings/account/password.php"]', {
                'password_old': data.oldPassword,
                'password_new': data.newPassword,
                'password_confirm': data.newPassword
            }, true);
        });
    }
};
