exports.adapter = {
    "name": "Skype",
    "passwordRegExp": /^.{6,20}$/, // 6 to 20 characters
    "update": function(data) {
        casper.start('https://login.skype.com/login');

        casper.then(function() {
            this.fill('form#loginForm', {
                'username': data.site.login,
                'password': data.oldPassword
            }, true);
        });

        casper.then(function() {
            this.open('https://secure.skype.com/account/personal/change-password-form');
        });

        casper.then(function() {
            this.fill('form#passwordChangeForm', {
                'old_password': data.oldPassword,
                'password_1': data.newPassword,
                'password_2': data.newPassword
            }, true);
        });
    }
};
