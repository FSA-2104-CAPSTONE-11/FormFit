const router = require("express").Router();
const {
  models: { User, PoseSession },
} = require("../db");
const requireToken = require("./gatekeeping");

// GET api/history (protected for logged in user)
router.get("/", requireToken, async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.user.id,
      },
      include: PoseSession,
    });
    res.send(user.poseSessions);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
