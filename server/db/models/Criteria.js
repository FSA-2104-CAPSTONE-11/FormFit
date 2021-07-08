const Sequelize = require("sequelize");
const db = require("../db");

const Criteria = db.define("criteria", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  quickDescription: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  longDescription: {
    type: Sequelize.TEXT,
  },
});

module.exports = Criteria;
