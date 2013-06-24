exports.adapter = {
    "name": "GitHub",
    "passwordRegExp": /^.*$/,
    "update": function(data) {
        casper.start('https://github.com/login');

        casper.then(function() {
            this.fill('form[action="/session"]', {
                'login': data.site.login,
                'password': data.oldPassword
            }, true);
        });

        casper.then(function() {
            this.open('https://github.com/settings/admin');
        });

        casper.then(function() {
            this.fill('form#change_password', {
                'user[old_password]': data.oldPassword,
                'user[password]': data.newPassword,
                'user[password_confirmation]': data.newPassword
            }, true);
        });
    }
};
