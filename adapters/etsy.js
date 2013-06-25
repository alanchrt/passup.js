exports.adapter = {
    "name": "Etsy",
    "passwordRegExp": /^.{6,}$/, // 6 or more characters
    "update": function(data) {
        casper.start('http://www.etsy.com/');

        casper.then(function() {
            this.click('a#sign-in');
        });

        casper.then(function() {
            this.fill('form#signin-form', {
                'username': data.site.login,
                'password': data.oldPassword
            }, true);
        });

        casper.then(function() {
            this.open('https://www.etsy.com/your/account');
        });

        casper.then(function() {
            this.fill('#settings form:first-child', {
                'current_password': data.oldPassword,
                'password': data.newPassword,
                'password_confirm': data.newPassword
            }, true);
        });
    }
};
