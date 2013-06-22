exports.adapter = {
    "name": "Hacker News",
    "passwordRegExp": /\w/,
    "start": "https://news.ycombinator.com/newslogin",
    "steps": [
        function(casper, data) {
            casper.fill('form', {
                'u': data.site.login,
                'p': data.oldPassword
            }, true);
        },
        function(casper, data) {
            casper.open('https://news.ycombinator.com/changepw');
        },
        // function(casper, data) {
        //     casper.fill('form', {
        //         'op': data.oldPassword,
        //         'p1': '',
        //         'p2': ''
        //     }, true);
        // }
    ]
};
