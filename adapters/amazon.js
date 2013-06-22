exports.adapter = {
    "name": "Amazon",
    "passwordRegExp": /\w/,
    "start": "https://www.amazon.com/ap/signin?_encoding=UTF8&openid.assoc_handle=usflex&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.mode=checkid_setup&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0&openid.ns.pape=http%3A%2F%2Fspecs.openid.net%2Fextensions%2Fpape%2F1.0&openid.pape.max_auth_age=0&openid.return_to=https%3A%2F%2Fwww.amazon.com%2Fgp%2Fcss%2Fhomepage.html%3Fie%3DUTF8%26ref_%3Dgno_yam_ya",
    "steps": [
        function(casper, site) {
            casper.fill('form#ap_signin_form', {
                'email': site.login,
                'password': site.password
            }, true);
        },
        function(casper, site) {
            casper.open('https://www.amazon.com/ap/cnep?_encoding=UTF8&openid.assoc_handle=usflex&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.mode=checkid_setup&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0&openid.ns.pape=http%3A%2F%2Fspecs.openid.net%2Fextensions%2Fpape%2F1.0&openid.pape.max_auth_age=0&openid.return_to=https%3A%2F%2Fwww.amazon.com%2Fgp%2Fcss%2Fhomepage.html%3Fie%3DUTF8%26ref_%3Dya_cnep');
        },
        function(casper, site) {
            if (casper.exists('form#ap_signin_form'))
                casper.fill('form#ap_signin_form', {
                    'email': site.login,
                    'password': site.password
                }, true);
        },
        function(casper, site) {
            if (!casper.exists('#cnep_1A_change_password_button'))
                casper.open('https://www.amazon.com/ap/cnep?_encoding=UTF8&openid.assoc_handle=usflex&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.mode=checkid_setup&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0&openid.ns.pape=http%3A%2F%2Fspecs.openid.net%2Fextensions%2Fpape%2F1.0&openid.pape.max_auth_age=0&openid.return_to=https%3A%2F%2Fwww.amazon.com%2Fgp%2Fcss%2Fhomepage.html%3Fie%3DUTF8%26ref_%3Dya_cnep');
        },
        // function(casper, site) {
        //     casper.click('#cnep_1A_change_password_button');
        // },
        // function(casper, site) {
        //     casper.fill('from#blahblah', {
        //         'current': 'hahaha',
        //         'new': 'new',
        //         'confirm': 'new'
        //     }, true);
        // }
    ]
};
