exports.adapter = {
    "name": "Openredis",
    "passwordRegExp": /\w/,
    "update": function(data) {
        casper.start('https://openredis.com/login');

        casper.then(function() {
            this.fill('form[action="/login"]', {
                'username': data.site.login,
                'password': data.oldPassword
            }, true);
        });

        casper.then(function() {
            this.open('https://openredis.com/account');
        });

        casper.then(function() {
            this.fill('form[action="/account"]', {
                'password': data.newPassword,
                'password_confirmation': data.newPassword
            }, true);
        });
    }
};
