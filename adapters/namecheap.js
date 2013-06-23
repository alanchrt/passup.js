exports.adapter = {
    "name": "Namecheap",
    "passwordRegExp": /\w/,
    "update": function(data) {
        casper.start('https://www.namecheap.com/myaccount/login-only.aspx');

        casper.then(function() {
            this.fill('fieldset.loginForm', {
                'LoginUserName': data.site.login,
                'LoginPassword': data.oldPassword
            });
        });

        casper.then(function() {
            this.click('fieldset.loginForm input[type="submit"]');
        });

        casper.then(function() {
            this.open('https://manage.www.namecheap.com/myaccount/modify-profile-changepassword.aspx');
        });

        casper.then(function() {
            this.fill('form#ctl00', {
                'ctl00$ContentPlaceHolder1$Password': data.oldPassword,
                'ctl00$ContentPlaceHolder1$NewPassword': data.newPassword,
                'ctl00$ContentPlaceHolder1$ConfirmPassword': data.newPassword
            });
        });

        casper.then(function() {
            this.click('form#ctl00 input[type="submit"]');
        });
    }
};
