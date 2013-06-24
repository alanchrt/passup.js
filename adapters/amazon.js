exports.adapter = {
    "name": "Amazon",
    "passwordRegExp": /^.{6,128}$/, // 6 to 128 characters
    "update": function(data) {
        casper.start('https://www.amazon.com/ap/signin?_encoding=UTF8&openid.assoc_handle=usflex&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.mode=checkid_setup&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0&openid.ns.pape=http%3A%2F%2Fspecs.openid.net%2Fextensions%2Fpape%2F1.0&openid.pape.max_auth_age=0&openid.return_to=https%3A%2F%2Fwww.amazon.com%2Fgp%2Fcss%2Fhomepage.html%3Fie%3DUTF8%26ref_%3Dgno_yam_ya');

        casper.then(function() {
            this.fill('form#ap_signin_form', {
                'email': data.site.login,
                'password': data.oldPassword
            }, true);
        });

        casper.then(function() {
            this.open('https://www.amazon.com/ap/cnep?_encoding=UTF8&openid.assoc_handle=usflex&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.mode=checkid_setup&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0&openid.ns.pape=http%3A%2F%2Fspecs.openid.net%2Fextensions%2Fpape%2F1.0&openid.pape.max_auth_age=0&openid.return_to=https%3A%2F%2Fwww.amazon.com%2Fgp%2Fcss%2Fhomepage.html%3Fie%3DUTF8%26ref_%3Dya_cnep');
        });

        casper.then(function() {
            if (this.exists('form#ap_signin_form'))
                this.fill('form#ap_signin_form', {
                    'email': data.site.login,
                    'password': data.oldPassword
                }, true);
        });

        casper.then(function() {
            if (!this.exists('#cnep_1A_change_password_button'))
                this.open('https://www.amazon.com/ap/cnep?_encoding=UTF8&openid.assoc_handle=usflex&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.mode=checkid_setup&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0&openid.ns.pape=http%3A%2F%2Fspecs.openid.net%2Fextensions%2Fpape%2F1.0&openid.pape.max_auth_age=0&openid.return_to=https%3A%2F%2Fwww.amazon.com%2Fgp%2Fcss%2Fhomepage.html%3Fie%3DUTF8%26ref_%3Dya_cnep');
        });

        casper.then(function() {
            this.click('#cnep_1A_change_password_button');
        });

        casper.then(function() {
            this.fill('form#ap_cnep_1d_form', {
                'password': data.oldPassword,
                'passwordNew': data.newPassword,
                'passwordNewCheck': data.newPassword
            }, true);
        });
    }
};
