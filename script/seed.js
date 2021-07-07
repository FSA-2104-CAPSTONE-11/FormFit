"use strict";

const {
  db,
  models: { User, PoseSession },
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

  // Creating PoseSessions
  const poseSessions = await Promise.all([
    PoseSession.create({
      reps: 1,
      score: 1,
      feedback: "keep torso upright",
      length: 10.4,
      userId: 1,
    }),
    PoseSession.create({
      reps: 1,
      score: 0,
      feedback: "keep torso up right and bend knees 90 degrees",
      length: 4.5,
      userId: 1,
    }),
  ]);

  console.log(`seeded ${users.length} users`);
  console.log(`seeded ${poseSessions.length} poseSessions`);
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
