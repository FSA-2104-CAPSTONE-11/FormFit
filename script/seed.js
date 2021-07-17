"use strict";

const {
  db,
  models: { User, PoseSession, Pose, Criteria },
} = require("../server/db");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users
  const users = await Promise.all([
    User.create({
      username: "cody",
      email: "cody@gmail.com",
      password: "123",
    }),
    User.create({
      username: "murphy",
      email: "murphy@gmail.com",
      password: "123",
    }),
    User.create({
      username: "Squatter55",
      email: "Squatter55@gmail.com",
      password: "Squatter55",
    }),
    User.create({
      username: "Xpose",
      email: "X@Pose.com",
      password: "Xpose",
    }),
    User.create({
      username: "Sparky",
      email: "Sparky@gmail.com",
      password: "Sparky",
    }),
    User.create({
      username: "Cabot",
      email: "Cabot@cruisin.com",
      password: "Cabot",
    }),
    User.create({
      username: "Squatter54",
      email: "Squatter54@gmail.com",
      password: "Squatter54",
    }),
    User.create({
      username: "TheDeepSquatter1",
      email: "TDS@gmail.com",
      password: "TheDeepSquatter1",
    }),
    User.create({
      username: "Tee",
      email: "Tee@gmail.com",
      password: "Tee",
    }),
    User.create({
      username: "Liya",
      email: "Liya@gmail.com",
      password: "Liya",
    }),
  ]);

  // Creating Pose
  const pose = await Promise.all([
    await Pose.create({
      name: "squat",
      instructions:
        "Stand 6 - 8ft away and face the camera! Keep your back and shoulders level as you squat as low as you can. When you come back up, that is 1 rep!",
    }),
    await Pose.create({
      name: "pushup",
      instructions:
        "Position the camera level with yourself 6-8ft away. Then face the camera and start in the up position. Remember to have control as you go down, and when you come up that is 1 rep!",
    }),
    await Pose.create({
      name: "situp",
      instructions:
        "Start in the up position with the camera on level ground aimed at your side, atleast 6ft away. Then go down and all the way back up for 1 rep!",
    }),
  ]);

  // Creating Criteria
  const criteria = await Promise.all([
    Criteria.create({
      name: "knees",
      quickDescription: "Knees reach 90 degrees",
      longDescription:
        "the angle between your knees, the floor, and your hips must reach 90 degrees. That means your thigh should be parallel to the ground.",
      spec: JSON.stringify({ right_hipright_knee: [0.5, null, 10, "require"] }),
      poseId: 1,
    }),
    Criteria.create({
      name: "shoulders",
      quickDescription: "Shoulders remain level",
      longDescription:
        "your shoulders should be at roughly the same height at all points during the squat. If your upper half begins to tilt, you will fail this test",
      spec: JSON.stringify({
        left_shoulderright_shoulder: [0.65, 10, null, "avoid"],
      }),
      poseId: 1,
    }),
    Criteria.create({
      name: "torso",
      quickDescription: "Torso remains upright",
      longDescription:
        "while your legs lower you to the ground, your upper body should remain upright. Your back should be flat, and your eyes should be looking straight forward, not towards the ground.",
      spec: JSON.stringify({
        right_shoulderright_hip: [0.5, null, 70, "avoid"],
      }),
      poseId: 1,
    }),
    Criteria.create({
      name: "level-shoulders",
      quickDescription: "Shoulders stay level",
      longDescription:
        "Through out the whole duration of a pushup, your shoulders should not tilt past 25deg!",
      spec: JSON.stringify({
        left_shoulderright_shoulder: [0.8, 25, null, "avoid"],
      }),
      poseId: 2,
    }),
    Criteria.create({
      name: "tricep",
      quickDescription: "Arms become fully extended",
      longDescription:
        "When pushing yourself up from the down position of a pushup, you know you are at the top when your tricep forms a 90deg angle with the ground!",
      spec: JSON.stringify({
        right_shoulderright_elbow: [0.5, 80, null, "require"],
      }),
      poseId: 2,
    }),
    Criteria.create({
      name: "level-hips",
      quickDescription: "Hips stay level",
      longDescription:
        "Through out the whole duration of a pushup, your hips should not tilt past 25deg!",
      spec: JSON.stringify({
        left_hipright_hip: [0.6, 25, null, "avoid"],
      }),
      poseId: 2,
    }),
    Criteria.create({
      name: "forearm",
      quickDescription: "Forearms stay perpendicular to ground",
      longDescription:
        "Through out the whole duration of a pushup, your forearm shouldn't go below a 20deg angle!",
      spec: JSON.stringify({
        right_elbowright_wrist: [0.8, null, 20, "avoid"],
      }),
      poseId: 2,
    }),
    Criteria.create({
      name: "up-position",
      quickDescription: "Back gets perpendicular to ground",
      longDescription:
        "When you are in the 'up position', your back should be atleast 75deg!",
      spec: JSON.stringify({
        right_shoulderright_hip: [0.5, 75, null, "require"],
      }),
      poseId: 3,
    }),
    Criteria.create({
      name: "down-position",
      quickDescription: "Back gets horizontal to ground",
      longDescription:
        "When you are in the down position your back should be flat with the ground, that includes your neck!",
      spec: JSON.stringify({
        left_shoulderleft_hip: [0.5, null, 5, "require"],
      }),
      poseId: 3,
    }),
    Criteria.create({
      name: "bent legs",
      quickDescription: "Legs stay bent",
      longDescription:
        "During the duration of a situp, your legs shouldnt move too much if at all. Try to keep them bent the whole time!",
      spec: JSON.stringify({
        right_hipright_knee: [0.5, null, 10, "avoid"],
      }),
      poseId: 3,
    }),
  ]);

  // Creating PoseSessions
  let poseSessions = [];
  let temp = [];
  let temp2 = [];
  for (let i = 0; i < 1000; i++) {
    let repNum = Math.ceil(Math.random() * 10);
    const poseNum = Math.random();
    const score = Math.round(Math.random() * repNum);
    const getFeedback = (repNumber, scoreNumber) => {
      if (scoreNumber === 0) {
        return "You can do better than that!";
      }
      if (repNumber > 0 && repNumber === scoreNumber) {
        return "WOW! Perfect! Keep it up!";
      }
      if (scoreNumber < 2) {
        if (5 < repNumber) {
          return "You did some reps, but not very well! Try again!";
        } else {
          return "Great progress, work on upping your reps and improving your form!";
        }
      }
      if (scoreNumber >= 2 && scoreNumber <= 5) {
        if (5 < repNumber) {
          return "Now we're moving, keep up the progress!";
        } else {
          return "That's a good score, but not many reps!";
        }
      }
      if (scoreNumber > 5) {
        return "Nice work!";
      }
    };
    const newSesh = {
      reps: repNum,
      score: score,
      feedback: getFeedback(repNum, score),
      length: Math.floor(Math.random() * 30 + 5),
      userId: Math.ceil(Math.random() * 10),
      poseId: poseNum < 0.33 ? 1 : poseNum > 0.66 ? 2 : 3,
      date: new Date(
        Date.now() - Math.floor(Math.random() * 90) * 24 * 60 * 60 * 1000
      ),
    };
    temp.push(newSesh);
  }
  temp2 = temp.sort(function (a, b) {
    return a.date - b.date;
  });
  for (let i = 0; i < temp2.length; i++) {
    poseSessions.push(await PoseSession.create({ ...temp2[i] }));
  }

  console.log(`seeded ${users.length} users`);
  console.log(`seeded ${poseSessions.length} poseSessions`);
  console.log(`seeded ${pose.length} poses`);
  console.log(`seeded ${criteria.length} criteria`);
  console.log(`seeded successfully`);
  return {
    users: {
      cody: users[0],
      murphy: users[1],
    },
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
