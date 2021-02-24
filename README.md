# FS-App-Template

## Setup

To use this as boilerplate, you'll need to take the following steps:

* Don't fork or clone this repo! Instead, create a new, empty
  directory on your machine and `git init` (or create an empty repo on
  Github and clone it to your local machine)

* Now you will have to add the fs-app-template as a remote

```
git remote add boilermaker git@github.com:FullstackAcademy/fs-app-template.git
git fetch boilermaker
```

## Customize

Now that you've got the code, follow these steps to get acclimated:

* Update project name and description in `package.json`
* `npm install`
* Create two postgres databases (`MY_APP_NAME` should match the `name`
  parameter in `package.json`):
* These commands will create both your **development** and **test** databases

```
createdb <YOUR APP NAME HERE FROM package.json> 
createdb <YOUR APP NAME HERE FROM package.json>-test 
```

* By default, running `npm test` will use your test database, while
  regular development uses development database 
* Create a file called `secrets.js` in the project root
  * This file is listed in `.gitignore`, and will _only_ be required
    in your _development_ environment
  * Its purpose is to attach the secret environment variables that you
    will use while developing
  * However, it's **very** important that you **not** push it to
    Github! Otherwise, _prying eyes_ will find your secret API keys!
  * It might look like this:


```
process.env.GITHUB_CLIENT_ID = 'the client id'
process.env.GITHUB_CLIENT_SECRET = 'the client secret'
```

### OAuth


* To use OAuth with Github, register an OAUTH app with github in order to obtain client_id and client_secret, the callback url should be set to http://localhost:8080/auth/github/callback

[github-oauth]: https://docs.github.com/en/developers/apps/authorizing-oauth-apps 

## Start

Running `npm run start:dev` will make great things happen!

- start:dev will both start your server and build your client side files using webpack
- start:dev:logger is the same as start:dev, but you will see your SQL queries (can be helpful for debugging)
- start:dev:seed will start your server and also seed your database


### Heroku

1.  Set up the [Heroku command line tools][heroku-cli]
2.  `heroku login`
3.  Add a git remote for heroku:

[heroku-cli]: https://devcenter.heroku.com/articles/heroku-cli

* **If you are creating a new app...**

  1.  `heroku create` or `heroku create your-app-name` if you have a
      name in mind.
  2.  `heroku config:set JWT=<your secret here!>` to set a secret for JWT signing

Database Setup

  3.  `heroku addons:create heroku-postgresql:hobby-dev` to add
      ("provision") a postgres database to your heroku dyno (This creates your production database)
 
  4.  `heroku config:set SEED=true` to get heroku to sync and seed your database

Oauth Setup

  5.  if you are using github oauth, you'll need to register another OAUTH app with github with the appropriate callback url and set the environment variables for GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET
  6.   note everytime your app restarts, the database tables will be dropped and re-created. To avoid this you can config:unset SEED 


* **If you already have a Heroku app...**

  1.  `heroku git:remote your-app-name` You'll need to be a
      collaborator on the app.


Now, you should be deployed!
