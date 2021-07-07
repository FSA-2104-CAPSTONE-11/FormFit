//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const PoseSession = require("./models/PoseSession");

//associations could go here!

PoseSession.belongsTo(User);
User.hasMany(PoseSession);

module.exports = {
  db,
  models: {
    User,
    PoseSession,
  },
};
