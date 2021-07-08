const {
  models: { User },
} = require("../db");

const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    req.user = await User.findByToken(token);
    next();
  } catch (error) {
    res.status(401).send("please log in to access this page!");
  }
};

module.exports = requireToken;
