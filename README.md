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

## Setting it Up

1. Fork and clone this repo.
2. `npm install`.
3. Create `formfit` database.
4. Seed the database with `npm run seed`
5. Start the build process and your application with: `npm run start:dev`.
6. Navigate to `localhost:8080` to see FormFit in action!


## Developers Behind FormFit

- Drew LaFiandra :mailbox_with_mail:[Linkedin](https://www.linkedin.com/in/lafiandra/)    :file_folder:[GitHub](https://github.com/alafiand)
- Finley Matthews :mailbox_with_mail:[Linkedin](https://www.linkedin.com/in/finley-matthews/)    :file_folder:[GitHub](https://github.com/finleymatthews96)
- Garrick Lim :mailbox_with_mail:[Linkedin](https://www.linkedin.com/in/garrick-lim/)    :file_folder:[GitHub](https://github.com/glim2)
- Sam Hannan :mailbox_with_mail:[Linkedin](https://www.linkedin.com/in/samhannan47/)     :file_folder:[GitHub](https://github.com/samhannan47)


## RoadMap

While the initial developers of FormFit don't have any plans to further the app, the code was left in a state so future developers can add exercises! Take a look at the Criteria and Pose models in `/server/db/models` to see how to format any additional criteria and corresponding exercises. Testing the exercise with MoveNet and interpreting the results will be necessary in order to determine what instructions to provide the user. Additionally, Some work could also eb down to preload the MoveNet model to make for a better user experience. We look forward to seeing what can be done with FormFit!

## Special Thanks

We would like to initally thank Jason Mayes from TensorFlow for suggesting MoveNet for FormFit and providing us with helpful resources. Additionally, FormFit would not have been possible if it weren't for our two great Team Leads: Lindsay Welhoelter and Ivan Lozano. Also, a special thanks to our Project Manager, Gary Kertis who always asked the tough questions! And of course, thank you to Fullstack Academy for providing us the opportunity to bring FomFit to life!

