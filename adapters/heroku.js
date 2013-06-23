exports.adapter = {
    "name": "Heroku",
    "passwordRegExp": /\w/,
    "update": function(data) {
        casper.start('https://id.heroku.com/login');

        casper.then(function() {
            this.fill('form[action="/login"]', {
                'email': data.site.login,
                'password': data.oldPassword
            }, true);
        });

        casper.then(function() {
            this.open('https://dashboard.heroku.com/account');
        });

        casper.then(function() {
            this.fill('.password form.edit_user', {
                'user[current_password]': data.oldPassword,
                'user[password]': data.newPassword,
                'user[password_confirmation]': data.newPassword
            }, true);
        });
    }
};
