exports.adapter = {
    "name": "LinkedIn",
    "passwordRegExp": /^.{6,}$/, // 6 or more characters
    "update": function(data) {
        casper.start('https://www.linkedin.com/uas/login');

        casper.then(function() {
            this.fill('form#login', {
                'session_key': data.site.login,
                'session_password': data.oldPassword
            }, true);
        });

        casper.then(function() {
            this.open('https://www.linkedin.com/uas/change-password');
        });

        casper.then(function() {
            this.fill('form[name="editPassword"]', {
                'oldPassword': data.oldPassword,
                'new_password': data.newPassword,
                'new_password_again': data.newPassword
            }, true);
        });
    }
};
