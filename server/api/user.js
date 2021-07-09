const router = require("express").Router();
const {
  models: { User, PoseSession, Pose },
} = require("../db");
module.exports = router;
const requireToken = require("./gatekeeping");

// //GET api/user (protected for logged in user)
router.get("/", requireToken, async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.user.id,
      },
      include: [{model: PoseSession, include: Pose}]
    })
    const { id, username, email, poseSessions } = user;
    res.json({ id, username, email, poseSessions });
  } catch (err) {
    next(err);
  }
});

// PUT api/user (protected for logged in user)
router.put("/", requireToken, async (req, res, next) => {
  try {
    await req.user.update(req.body);
    const { id, username, email } = req.user;
    res.json({ id, username, email });
  } catch (error) {
    next(error);
  }
});
