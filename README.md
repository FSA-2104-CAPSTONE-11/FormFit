# FS-App-Template

- [wireframe](https://excalidraw.com/#room=04d57841836bb5b8b5bf,EqFvwtu77BcEk1B8HuxMIA)
- [social-norms](https://docs.google.com/document/d/17C1qFGx-4g0fU8tLFT0D9BJzfIHrnF9ywGObhf0T20k/edit?ts=60db4a0b#)
- [mvp notes](https://excalidraw.com/#room=4a37f889666ad05489cd,uMxTdx1ZfAZrzhj826FTpg)
- [schema design](https://excalidraw.com/#room=e4e947a33cf3387110fa,3HkFJSdAniwVapDgW4JjDw)
- [ivans ReactNative/expo course](https://codewithmosh.com/p/the-ultimate-react-native-course)
- [expo.io](https://expo.io/)
- [tfjs github](https://github.com/tensorflow/tfjs-models/tree/master/pose-detection/src/movenet)
- [pwa](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)

## Setup

To use this as boilerplate, you'll need to take the following steps:

- Don't fork or clone this repo! Instead, create a new, empty
  directory on your machine and `git init` (or create an empty repo on
  Github and clone it to your local machine)

- Now you will have to add the fs-app-template as a remote and merge it into your own repository.

```
git remote add boilermaker https://github.com/FullstackAcademy/fs-app-template.git
git fetch boilermaker
git merge boilermaker/main
git branch -m master main
```

## Customize

Now that you've got the code, follow these steps to get acclimated:

- Update project name and description in `package.json`
- `npm install`
- Create two postgres databases (`MY_APP_NAME` should match the `name`
  parameter in `package.json`):
- These commands will create both your **development** and **test** databases

```
createdb <YOUR APP NAME HERE FROM package.json>
createdb <YOUR APP NAME HERE FROM package.json>-test
```

- By default, running `npm test` will use your test database, while
  regular development uses development database

## Start

Sync and seed your database by running `npm run seed`. Running `npm run start:dev` will make great things happen!

- start:dev will both start your server and build your client side files using webpack
- start:dev:logger is the same as start:dev, but you will see your SQL queries (can be helpful for debugging)
- start:dev:seed will start your server and also seed your database (this is useful when you are making schema changes and you don't want to run your seed script separately)

### Heroku

1.  Set up the [Heroku command line tools][heroku-cli]
2.  `heroku login`
3.  Add a git remote for heroku:

[heroku-cli]: https://devcenter.heroku.com/articles/heroku-cli

- **If you are creating a new app...**

  1.  `heroku create` or `heroku create your-app-name` if you have a
      name in mind.
  2.  `heroku config:set JWT=<your secret here!>` to set a secret for JWT signing

Database Setup

3.  `heroku addons:create heroku-postgresql:hobby-dev` to add
    ("provision") a postgres database to your heroku dyno (This creates your production database)

4.  `heroku config:set SEED=true` to get heroku to sync and seed your database

5.  note everytime your app restarts, the database tables will be dropped and re-created. To avoid this you can `config:unset SEED`

- **If you already have a Heroku app...**

  1.  `heroku git:remote your-app-name` You'll need to be a
      collaborator on the app.

Now, you should be deployed!
