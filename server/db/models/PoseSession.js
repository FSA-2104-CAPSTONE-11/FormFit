const Sequelize = require("sequelize");
const db = require("../db");

const PoseSession = db.define("poseSession", {
  reps: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  score: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  feedback: {
    type: Sequelize.TEXT,
  },
  length: {
    type: Sequelize.FLOAT,
  },
});

module.exports = PoseSession;