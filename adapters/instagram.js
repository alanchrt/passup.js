exports.adapter = {
    "name": "Instagram",
    "passwordRegExp": /\w/,
    "update": function(data) {
        casper.start('https://instagram.com/accounts/login/');

        casper.then(function() {
            this.fill('form#login-form', {
                'username': data.site.login,
                'password': data.oldPassword
            }, true);
        });

        casper.then(function() {
            this.open('https://instagram.com/accounts/password/change/');
        });

        casper.then(function() {
            this.fill('form', {
                'old_password': data.oldPassword,
                'new_password1': data.newPassword,
                'new_password2': data.newPassword
            }, true);
        });
    }
};
