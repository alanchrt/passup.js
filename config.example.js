exports.config = {
    "passwords": [
        {
            "name": "secure",
            "sites": [
                {
                    "adapter": "amazon",
                    "login": "user@email.com"
                },
                {
                    "adapter": "github",
                    "login": "username"
                },
                {
                    "adapter": "google",
                    "login": "user@email.com"
                },
                {
                    "adapter": "heroku",
                    "login": "user@email.com"
                },
                {
                    "adapter": "namecheap",
                    "login": "username"
                },
                {
                    "adapter": "rackspaceCloud",
                    "login": "username"
                }
            ]
        },
        {
            "name": "alphanumeric-secure",
            "sites": [
                {
                    "adapter": "enomCentral",
                    "login": "username"
                }
            ]
        },
        {
            "name": "mobile-friendly",
            "sites": [
                {
                    "adapter": "facebook",
                    "login": "user@email.com"
                },
                {
                    "adapter": "hackerNews",
                    "login": "username"
                },
                {
                    "adapter": "instagram",
                    "login": "username"
                }
            ]
        }
    ]
};
