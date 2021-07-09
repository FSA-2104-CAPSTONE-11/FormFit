const router = require("express").Router();
const {
  models: { Pose, Criteria },
} = require("../db");
const requireToken = require("./gatekeeping");
module.exports = router;

// GET api/pose/:poseName (protected for logged in user)
router.get("/:poseName", requireToken, async (req, res, next) => {
  try {
    const pose = await Pose.findOne({
      where: {
        name: req.params.poseName,
      },
      include: Criteria,
    });
    res.send(pose);
  } catch (err) {
    next(err);
  }
});
