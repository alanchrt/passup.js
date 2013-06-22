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
                }
            ]
        }
    ]
};
