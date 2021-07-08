const router = require("express").Router();
const {
  models: {User},
} = require("../db");
module.exports = router;
const requireToken = require("./gatekeeping");

// //GET api/user (protected for logged in user)
router.get("/", requireToken, async (req, res, next) => {
  try {
    const {id, username, email} = req.user
    res.json({id, username, email});
  } catch (err) {
    next(err);
  }
});

// PUT api/user (protected for logged in user)
router.put("/", requireToken, async (req, res, next) => {
  try {
    await req.user.update(req.body);
    const {id, username, email} = req.user
    res.json({id, username, email});
  } catch (error) {
    next(err);
  }
});
