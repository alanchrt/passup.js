exports.adapter = {
    "name": "Rackspace Cloud",
    "passwordRegExp": /^.*$/,
    "update": function(data) {
        casper.start('https://manage.rackspacecloud.com/pages/Login.jsp');
        casper.viewport(1024, 768);

        casper.then(function() {
            this.sendKeys('input[name="username"]', data.site.login);
            this.sendKeys('input[name="password"]', data.oldPassword);
            this.click('#submitButton');
        });

        casper.then(function() {
            this.open('https://manage.rackspacecloud.com/ContactList.do');
        });

        casper.then(function() {
            this.click('a#change-account-password');
        });

        casper.then(function() {
            this.sendKeys('input[name="currentPassword"]', data.oldPassword);
            this.sendKeys('input[name="newPassword"]', data.newPassword);
            this.sendKeys('input[name="confirmNewPassword"]', data.newPassword);
            this.click('#saveButton');
        });
    }
};
