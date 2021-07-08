//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const PoseSession = require("./models/PoseSession");
const Pose = require("./models/Pose");
const Criteria = require("./models/Criteria");

//associations could go here!

PoseSession.belongsTo(User);
User.hasMany(PoseSession);

PoseSession.belongsTo(Pose);
Pose.hasMany(PoseSession);

Criteria.belongsTo(Pose);
Pose.hasMany(Criteria);

module.exports = {
  db,
  models: {
    User,
    PoseSession,
    Pose,
    Criteria,
  },
};
