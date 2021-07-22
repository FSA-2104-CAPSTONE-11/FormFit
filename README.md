# FormFit <img src="/public/images/logo.png" width="35"/>

![GitHub top language](https://img.shields.io/github/languages/top/FSA-2104-CAPSTONE-11/FormFit)
![GitHub language count](https://img.shields.io/github/languages/count/FSA-2104-CAPSTONE-11/FormFit)
![GitHub closed pull requests](https://img.shields.io/github/issues-pr-closed-raw/FSA-2104-CAPSTONE-11/FormFit)
![GitHub repo size](https://img.shields.io/github/repo-size/FSA-2104-CAPSTONE-11/formfit)



## Introduction 

FormFit is an exercise assistant Progressive-Web-App that provides feedback on different exercises. After creating an account, a user can get feedback on either a Squat, Push-Up, or Sit-Up. The feedback provided is based on calculations of different joints in real time as the user does their exercise of choice. A user can then check their history and see that history charted on the dashboard. If they are persistent enough and lucky they might find themselves on the global leaderboard!


## Visit the Deployed App

[Form Fit](http://formfit.herokuapp.com/) 
- **provide steps on how to download to homepage**.   !TODO!

## Tech Stack

The framework of our Progressive Web App relies on React, Redux Toolkit, PostgreSQL, 
Express, and Node.js, but we also make use of a few other technologies, including:

- Movenet from Tensorflow, which uses a trained Machine Learning model to keep track of  your body 
movements in real time, and thus allows us to calculate a score and provide feedback on your form
- a Redis cache, which sits in front of our database and houses a sorted set that allows our leaderboard 
to update instantly
- Material UI, which we used to style our app, and allows it to work well and look great on all devices, 
though we do recommend using it on your mobile phone  

![Screen Shot 2021-07-19 at 6 43 54 PM](https://user-images.githubusercontent.com/79953082/126699650-3f77f725-eda2-475d-9aef-7780df5d8f6c.png)

## Setting it Up

1. Fork and clone this repo.
2. `npm install`.
3. Create `formfit` database.
4. Seed the database with `npm run seed`
5. Start the build process and your application with: `npm run start:dev`.
6. Navigate to `localhost:8080` to see FormFit in action!


## Things to include
- us, tech stack, thanks, pictures  
