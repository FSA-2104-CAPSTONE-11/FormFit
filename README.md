# FormFit <img src="/public/images/logo.png" width="35"/>

![GitHub top language](https://img.shields.io/github/languages/top/FSA-2104-CAPSTONE-11/FormFit)
![GitHub language count](https://img.shields.io/github/languages/count/FSA-2104-CAPSTONE-11/FormFit)
![GitHub closed pull requests](https://img.shields.io/github/issues-pr-closed-raw/FSA-2104-CAPSTONE-11/FormFit)
![GitHub repo size](https://img.shields.io/github/repo-size/FSA-2104-CAPSTONE-11/formfit)



## Introduction 

FormFit is a digital fitness coach that analyses your form in real-time, assessing alignment and range of motion while exercising. The app gives you a score on squats, push-ups, or sit-ups. The feedback provided is based on calculations of different joints as you exercise. Summary statistics for each repetition are displayed upon completion of a session. Your history will be preserved to view during later visits and your performance data will displayed on the home dashboard in a visually pleasing display. If you are persistent enough, you might find yourself on the global leaderboard, which shows the top 10 point-earners throughout the app!


## Visit the Deployed App

[Form Fit](http://formfit.herokuapp.com/) 
This Progressive-Web-App can be used in-browser on a phone or desktop, however it is recommended you use your phone. The app can be installed on the desktop of your phone by following the below instructions:

#### iOS Installation 

1. Navigate to formfit.herokuapp.com in **Safari**
2. Click on the share button
![shareButton](https://user-images.githubusercontent.com/79876588/126702177-ea7ebd6d-e746-4425-a928-4dc9c9eb9ffc.jpg)
3. Select "Add to Home Screen"
![addToHomeScreen](https://user-images.githubusercontent.com/79876588/126702107-5744959c-dca1-4b5f-9955-d1208eb2f6ae.jpg)
4. The FormFit app should now be on your phone's desktop!

#### Android Installation 

1. Navigate to formfit.herokuapp.com in **Chrome** ![image](https://user-images.githubusercontent.com/79876588/126702900-0dd4fe34-ba7d-4f23-b614-43d92c86e591.png)
2. Click on the three dots in the upper right hand corner
3. Tap Add to home screen.
4. Press Add when the prompt is shown
5. The FormFit app should now be on your phone's desktop!

## Tech Stack

The framework of our Progressive Web App relies on React, Redux Toolkit, PostgreSQL, 
Express, and Node.js, but we also make use of a few other technologies, including:

- MoveNet from Tensorflow, which uses a trained Machine Learning model to keep track of  your body 
movements in real time, and thus allows us to calculate a score and provide feedback on your form
- a Redis cache, which sits in front of our database and houses a sorted set that allows our leaderboard 
to update instantly
- Material UI, which we used to style our app, and allows it to work well and look great on all devices, 
though we do recommend using it on your mobile phone  

![Screen Shot 2021-07-19 at 6 43 54 PM](https://user-images.githubusercontent.com/79953082/126699650-3f77f725-eda2-475d-9aef-7780df5d8f6c.png)

## Setting it Up

1. Fork and clone this repo.
2. Install [Redis](https://redis.io/download) if you haven't already.
3. `npm install`.
4. Create `formfit` database.
5. Seed the database with `npm run seed`.
6. Instantiate local Redis server with: `redis-server`.
7. Start the build process and your application with: `npm run start:dev`.
8. Navigate to `localhost:8080` to see FormFit in action!


## Things to include
- us, tech stack, thanks, pictures  
