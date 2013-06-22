exports.adapter = {
    "name": "Hacker News",
    "passwordRegExp": /\w/, // at least 8 characters
    "update": function(data) {
        casper.start("https://news.ycombinator.com/newslogin");

        casper.then(function() {
            this.fill('form', {
                'u': data.site.login,
                'p': data.oldPassword
            }, true);
        });

        casper.then(function() {
            this.open('https://news.ycombinator.com/changepw');
        });

        casper.then(function() {
            this.fill('form', {
                'op': data.oldPassword,
                'p1': data.newPassword,
                'p2': data.newPassword
            }, true);
        });
    }
};
