exports.adapter = {
    "name": "Wordpress",
    "passwordRegExp": /^.{6,}$/, // at least 6 characters
    "update": function(data) {
        casper.start('http://wordpress.com/');

        casper.then(function() {
            this.fill('#home-signin form', {
                'log': data.site.login,
                'pwd': data.oldPassword
            }, true);
        });

        casper.then(function() {
            this.open('https://wordpress.com/?ssl=forced#!/settings/password/');
        });

        casper.then(function() {
            this.sendKeys('#password1 input#pass1', data.newPassword);
        });

        casper.waitFor(function() {
            return !this.exists('#save-form.disabled');
        }, function() {
            this.click('#save-form');
        });
    }
};
