exports.adapter = {
    "name": "Trello",
    "passwordRegExp": /^.{4}$/, // atleast 4 characters long.
    "update": function(data) {
        casper.start('https://trello.com/login');

        casper.then(function() {
            this.fill('form.primary-col', {
                'user': data.site.login,
                'password': data.oldPassword
            }, true);
        });

        casper.then(function() {
            var ending = this.getElementAttribute('a.js-member-account', 'href');
            this.open('https://trello.com' + ending);
        });

        casper.then(function() {
            this.click('a.js-change-password');
        });

        casper.then(function() {
            this.fill('div.pop-over form', {
                'oldpassword': data.oldPassword,
                'password': data.newPassword,
                'password2': data.newPassword
            }, false);
            // fill method's form submission doesn't seem to work on this site.
            this.click('input.js-save-changes');
        });
    }
};
