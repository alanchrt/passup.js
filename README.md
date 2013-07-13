Passup.js
=========

Update all of your passwords at once
------------------------------------

Security experts recommend updating account passwords frequently to mitigate the damage inflicted by a compromised password. However, most of us maintain multiple web accounts and have hardly updated a handful of passwords before it's time to rotate again.

**Passup.js** is a password updater built on CasperJS and PhantomJS that takes some of the pain out of updating web passwords.

![passup.js](https://raw.github.com/alanctkc/passup.js/master/screenshot.png)

Passup includes simple adapters for major websites and uses a headless web browser to automate the process of changing your passwords. Passup allows you to configure a list of sites you use for each password and update each group of sites by typing the password only once. So, for example, if you use the same password for all your social media sites and throwaway accounts, you can bulk update them with a single command.

### Contributors Needed

**Don't be shy!** The more developers that contribute Passup.js adapters and use them for their own accounts, the more valuable the repository becomes for everyone. Please send pull requests to the [passup-adapters repository](https://github.com/alanctkc/passup-adapters) for any adapters you create for the sites you use, regardless of their size or popularity. Additionally, if you find a way to improve an existing adapter, please feel free to submit your contribution.

Getting Started
---------------

** Make sure your PhantomJS installation is version 1.9 or greater, since system.stdin and system.stdout are unsupported in prior versions.

### Installation

Use `npm` to install:

    $ npm install -g

Then create a configuration file for your passwords:

    $ passup config

This command will create an example configuration in `~/.passup.json`. Open the file in your text editor of choice and configure to your liking.

### Configuration

A simple `~/.passup.json` configuration looks something like this:

    {
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
    }

In this example, we've specified four passwords -- "amazon-secure," "github-secure," "google-secure," and "mobile-friendly." Password names must include only alphanumeric characters, dashes, and underscores.

Each password contains a list of the sites that use that password. To get started, you'll want to group your sites together with passwords as you already use them, or you'll want to update your web account passwords to match your configuration. Basically, just make sure that when you start, your password groups specified here match how you actually have the passwords set so things don't get out of sync. It's recommended to include only a single site for each password you truly want to be secure, so you aren't using the same password on two sensitive sites -- in the event that one gets compromised.

Each site specifies an adapter, which is simply the adapter filename without the `.js` extension (CommonJS specification). Additionally, sites contain extra data, usually a `login` attribute and zero or more additional parameters needed for login.

### Updating Passwords

Make sure you have the latest adapters, then issue the `passup` command to update all of your passwords:

    $ passup update
    $ passup

To update only a single password group, call `passup` like this:

    $ passup --password=secure

Or, for a list of passwords:

    $ passup --password=secure,social,shopping

To update only a single adapter, use this command:

    $ passup --adapter=google

Or a list:

    $ passup --adapter=google,amazon

Creating Adapters
-----------------

Adapaters are written in CasperJS and run on the headless PhantomJS browser.

For further information on creating, modifying, and sharing adapters with Passup users, check out the [passup-adapters](https://github.com/alanctkc/passup-adapters) repository.

To-Do
-----

* Settle on test runner and write unit tests (not for update methods in adapters, but for the passup.js core and modules).
* Create `npm` package with `passup` command and publish to the registry.
* Create screenshot capture mechanism. Determine best approach. See [#2](https://github.com/alanctkc/passup.js/issues/2).


[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/alanctkc/passup.js/trend.png)](https://bitdeli.com/free "Bitdeli Badge")
