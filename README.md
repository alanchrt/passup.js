Passup.js
=========

Update all of your passwords at once
------------------------------------

Security experts recommend updating account passwords frequently to mitigate the damage inflicted by a compromised password. However, most of us maintain multiple web accounts and have hardly updated a handful of passwords before it's time to rotate again.

**Passup.js** is a password updater built on CasperJS and PhantomJS that takes some of the pain out of updating web passwords.

    $ passup
    Passup.js -- version 0.1.0
    
    Old "amazon-secure" password: myoldamazonpass
    New "amazon-secure" password: mynewamazonpass

    Old "github-secure" password: myoldgithubpass
    New "github-secure" password: mynewgithubpass

    Old "google-secure" password: myoldgooglepass
    New "google-secure" password: mynewgooglepass

    Old "mobile-friendly" password: myoldthrowaway
    New "mobile-friendly" password: mynewthrowaway

    Updating Amazon...
    Done.
    
    Updating GitHub...
    Done.
    
    Updating Google...
    Done.

    Updating Facebook...
    Done.

    Updating Hacker News...
    Done.

Passup includes simple adapters for major websites and uses a headless web browser to automate the process of changing your passwords. Passup allows you to configure a list of sites you use for each password and update each group of sites by typing the password only once. So, for example, if you use the same password for all your social media sites and throwaway accounts, you can bulk update them with a single command.

### Contributors Needed

The more developers that contribute Passup.js adapters and use them for their own accounts, the more valuable the repository becomes for everyone. Please send pull requests for any adapters you create for the sites you use, regardless of their size or popularity. Additionally, if you find a way to improve an existing adapter, please feel free to submit your contribution.

Getting Started
---------------

**WARNING: Passup.js is in version 0.1.0 and working toward a 1.0 release. The below documentation on the installation and CLI is the envisioned API and not yet functional. To use Passup.js now and contribute adapters, install PhantomJS and CasperJS, clone this repo, and use the command `casperjs passup.js`. Passup currently expects a file named `config.js` in the root of the repo that matches the format in `config.example.js`.**

** Make sure your PhantomJS version is 1.9 or greater, since system.stdin and system.stdout support came with version 1.9

### Installation

Use `npm` to install:

    $ npm install -g passup.js

Then create a configuration file for your passwords:

    $ passup config

This command will create an example configuration in `~/.passup.js`. Open the file in your text editor of choice and configure to your liking.

### Configuration

A simple `~/.passup.js` configuration looks something like this:

    exports.config = {
        "passwords": [
            {
                "name": "amazon-secure",
                "sites": [
                    {
                        "adapter": "amazon",
                        "login": "user@email.com"
                    }
                ]
            },
            {
                "name": "github-secure",
                "sites": [
                    {
                        "adapter": "github",
                        "login": "username"
                    }
                ]
            },
            {
                "name": "google-secure",
                "sites": [
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

In this example, we've specified four passwords -- "amazon-secure," "github-secure," "google-secure," and "mobile-friendly." Password names must include only alphanumeric characters, dashes, and underscores.

Passwords contain a list of the sites that use that password. To get started, you'll want to group your sites together with passwords as you already use them, or you'll want to update your web account passwords to match your configuration. Basically, just make sure that when you start, your password groups specified here match how you actually have the passwords set so things don't get out of sync. It's recommended to include only a single site for each password you truly want to be secure, so you aren't using the same password on two sensitive sites -- in the event that one gets compromised.

Each site specifies an adapter, which is simply the adapter filename without the `.js` extension (CommonJS specification). Additionally, sites contain extra data, usually a `login` attribute and zero or more additional parameters needed for login.

### Updating Passwords

Make sure you have the latest adapters, then issue the `passup` command to update all of your passwords:

    $ passup update
    $ passup

To update only a single password group, call `passup` like this:

    $ passup --password=secure

To update only a single adapter, use this command:

    $ passup --adapter=google

Creating Adapters
-----------------

Adapaters are written in CasperJS and run on the headless PhantomJS browser.

The easiest way to contribute an adapter is simply to copy an existing adapter and make modifications as necessary.

Here's an example of a simple `github.js` adapter:

    exports.adapter = {
        "name": "GitHub",
        "passwordRegExp": /\w/,
        "update": function(data) {
            casper.start('https://github.com/login');

            casper.then(function() {
                this.fill('form[action="/session"]', {
                    'login': data.site.login,
                    'password': data.oldPassword
                }, true);
            });

            casper.then(function() {
                this.open('https://github.com/settings/admin');
            });

            casper.then(function() {
                this.fill('form#change_password', {
                    'user[old_password]': data.oldPassword,
                    'user[password]': data.newPassword,
                    'user[password_confirmation]': data.newPassword
                }, true);
            });
        }
    };

The adapter `name` is a human-readable name for the adapter that will be printed to the terminal when it is updated. `passwordRegExp` is a JavaScript regular expression that specifies the password requirements for the given site.

The update function sets up the CasperJS steps to update the password on that site. View the full CasperJS API documentation [here](http://casperjs.org/api.html). The function should take a parameter called `data`, which provides two special properties, `data.oldPassword` and `data.newPassword`, in addition to a `data.site` object that contains all the site's properties from the user's `~/.passup.js`.

The filename of your adapter, minus the `.js` extension (CommonJS specification), will be the identifier used to include the adapter in a user's `~/.passup.js` configuration. Be sure to use sensible names, usually just the main string of the website's domain. In the `github.js` example above, the adapter identifier used in configuration files is `github`.

After creating your adapter, add an example configuration to a password group in `config.example.js`. For the example above, it looks like this:

    {
        "adapter": "github",
        "login": "username"
    }

If you need additional data in your update function, be sure to include it in the example configuration. It might look something like this:

    {
        "adapter": "bankOfAmerica",
        "login": "username",
        "state": "MO"
    }

When you're relatively sure your adapter works reliably, send a pull request and it will be added to the repository to be shared with other users.

To-Do
-----

* Create `npm` package with `passup` command and publish to registry.
* Add CLI arguments.
* Break adapters into separate repository for updating separate from passup utility.
* Add error handling for failed attempts, with screenshot capture.
