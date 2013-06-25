exports.adapter = {
    "name": "Reddit",
    "passwordRegExp": /^.{3,}$/, // 3 to infinite characters
    "update": function(data) {
        var content;
        var uh;

        casper.start();

        casper.then(function() {
            casper.open('http://www.reddit.com/api/login/' + data.site.login + '?user='+ data.site.login + '&passwd=' + data.oldPassword + '&api_type=json', {method: 'post'});
        });

        casper.thenOpen(
            'http://www.reddit.com/api/login/' + data.site.login + '?user='+ data.site.login + '&passwd=' + data.oldPassword + '&api_type=json',
            { method: 'post' }
        );

        casper.then(function() {
            console.log(this.getPageContent());
            content = JSON.parse(this.getPageContent());
            uh      = content.json.data.modhash;
        });

        casper.then(function() {
            casper.open('http://www.reddit.com/api/update?curpass=' + data.oldPassword + '&newpass=' + data.newPassword + '&verpass=' + data.newPassword + '&verify=false&uh=' + uh, {method: 'post'});
        });

        casper.run();
    }
};
