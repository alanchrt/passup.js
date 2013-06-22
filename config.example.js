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
