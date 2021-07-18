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
  date: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
  },
});

module.exports = PoseSession;
