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
    User.create({ username: "cody", email: "cody@gmail.com", password: "123" }),
    User.create({
      username: "murphy",
      email: "murphy@gmail.com",
      password: "123",
    }),
  ]);

  // Creating Pose
  const pose = await Promise.all([
    Pose.create({
      name: "squat",
      instructions:
        "in order to squat, directly face the camera, and drop your butt backwards towards the ground until your thighs are at least level with the floor. Keep your back upright and shoulders level the whole time. Then, stand back up straight. That is one rep!",
    }),
    Pose.create({
      name: "pushup",
      instructions:
        "To do a push up, position your hands about shoulder width apart. Try to keep your back and legs straight as you go down to the ground before you push yourself back up. That is one rep!",
    }),
    Pose.create({
      name: "situp",
      instructions:
        "To do a sit up, sit on your butt with your feet on the ground and knees bent. Then slowly control yourself as you roll your back to the ground and then squeeze your core as you bring yourself back up to the starting position. That is one rep!",
    }),
  ]);

  // Creating Criteria
  const criteria = await Promise.all([
    Criteria.create({
      name: "knees",
      quickDescription: "knees must reach 90 degrees",
      longDescription:
        "the angle between your knees, the floor, and your hips must reach 90 degrees. That means your thigh should be parallel to the ground.",
      spec: JSON.stringify({ right_hipright_knee: [0.5, null, 10, "require"] }),
      poseId: 1,
    }),
    Criteria.create({
      name: "shoulders",
      quickDescription: "shoulders remain level",
      longDescription:
        "your shoulders should be at roughly the same height at all points during the squat. If your upper half begins to tilt, you will fail this test",
      spec: JSON.stringify({
        left_shoulderright_shoulder: [0.65, 10, null, "avoid"],
      }),
      poseId: 1,
    }),
    Criteria.create({
      name: "torso",
      quickDescription: "torso remains upright",
      longDescription:
        "while your legs lower you to the ground, your upper body should remain upright. Your back should be flat, and your eyes should be looking straight forward, not towards the ground.",
      spec: JSON.stringify({
        right_shoulderright_hip: [0.5, null, 70, "avoid"],
      }),
      poseId: 1,
    }),
    Criteria.create({
      name: "back",
      quickDescription: "back stays level",
      longDescription:
        "Through out the whole duration of a pushup, your back can get as even with the ground, but shouldnt exceed a 35deg angle!",
      spec: JSON.stringify({
        right_shoulderright_hip: [0.8, 35, null, "avoid"],
      }),
      poseId: 2,
    }),
    Criteria.create({
      name: "tricep",
      quickDescription: "tricep should become perpendicular with the ground",
      longDescription:
        "When pushing yourself up from the down position of a pushup, you know you are at the top when your tricep forms a 90deg angle with the ground!",
      spec: JSON.stringify({
        right_shoulderright_elbow: [0.5, 85, null, "require"],
      }),
      poseId: 2,
    }),
    Criteria.create({
      name: "legs",
      quickDescription: "legs stay level",
      longDescription:
        "Through out the whole duration of a pushup, your legs can get as even with the ground, but shouldnt exceed a 35deg angle!",
      spec: JSON.stringify({
        right_hipright_knee: [0.6, 35, null, "avoid"],
      }),
      poseId: 2,
    }),
    Criteria.create({
      name: "forearm",
      quickDescription: "forearm never dips below perpendicular level",
      longDescription:
        "Through out the whole duration of a pushup, your forearm shouldn't go below a 75deg angle!",
      spec: JSON.stringify({
        right_elbowright_wrist: [0.8, null, 75, "avoid"],
      }),
      poseId: 2,
    }),
    // Criteria.create({
    //   name: 'abs',
    //   quickDescription: ""
    // })
  ]);

  // Creating PoseSessions
  const poseSessions = [];
  for (let i = 0; i < 25; i++) {
    const repNum = Math.floor(Math.random() * 20) + 5;
    const newSesh = await PoseSession.create({
      reps: repNum,
      score: Math.floor(repNum * 3 * 0.8),
      feedback: Math.random() < 0.5 ? "keep it up" : "never do that, c'mon",
      length: Math.floor(Math.random() * 30 + 5),
      userId: Math.random() < 0.5 ? 1 : 2,
      poseId: Math.random() < 0.5 ? 1 : 2,
      date: new Date(2021, 6, Math.floor(Math.random() * 7) + 6),
    });
    poseSessions.push(newSesh);
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
