exports.config = {
    "passwords": [
        {
            "name": "development",
            "sites": [
                {
                    "adapter": "amazon",
                    "login": "user@email.com"
                },
                {
                    "adapter": "enomCentral",
                    "login": "username"
                },
                {
                    "adapter": "github",
                    "login": "username"
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
                    "adapter": "openredis",
                    "login": "user@email.com"
                },
                {
                    "adapter": "rackspaceCloud",
                    "login": "username"
                }
            ]
        },
        {
            "name": "productivity",
            "sites": [
                {
                    "adapter": "google",
                    "login": "user@email.com"
                }
            ]
        },
        {
            "name": "social",
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
