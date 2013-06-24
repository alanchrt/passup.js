exports.adapter = {
    "name": "Google",
    "passwordRegExp": /^.{8,}$/, // at least 8 characters
    "update": function(data) {
        casper.start('https://accounts.google.com/ServiceLogin');

        casper.then(function() {
            this.fill('form#gaia_loginform', {
                'Email': data.site.login,
                'Passwd': data.oldPassword
            }, true);
        });

        casper.then(function() {
            this.open('https://accounts.google.com/b/0/EditPasswd');
        });

        casper.then(function() {
            this.fill('form#editpasswd', {
                'OldPasswd': data.oldPassword,
                'Passwd': data.newPassword,
                'PasswdAgain': data.newPassword
            }, true);
        });
    }
};
