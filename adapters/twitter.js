exports.adapter = {
    "name": "Twitter",
    "passwordRegExp": /^.{6,}$/, // 6 or more characters but twitter has other password restrictions for example 123456 or asdfgh will not be accepted
    "update": function(data) {
        casper.start('https://twitter.com/');

        casper.then(function() {
            this.fill('div.front-signin > form.signin', {
                'session[username_or_email]': data.site.login,
                'session[password]': data.oldPassword
            },true);
        });

        casper.then(function() {
            this.open('https://twitter.com/settings/password');
        });

        casper.then(function() {
            this.fill('form#password-form', {
                'current_password': data.oldPassword,
                'user_password': data.newPassword,
                'user_password_confirmation': data.newPassword
            },true);
        });
    }
};
