const router = require("express").Router();
const {
  models: { User, PoseSession },
} = require("../db");
const { client } = require("../app");
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

    const orderedPoseSessions = user.poseSessions.reverse();
    res.send(orderedPoseSessions);
  } catch (err) {
    next(err);
  }
});

// POST api/history (protected, related to user and exercise)
router.post("/", requireToken, async (req, res, next) => {
  try {
    const { reps, feedback, poseId, score } = req.body;

    // Leaderboard / Redis piece
    const args = ["overallLeaderboard", score, req.user.username];

    client.zadd(args, async (err, result) => {
      if (err) {
        console.log("error updating leaderboard", err);
      } else {
        console.log("we did it", result);
      }
    });

    // SQL
    const pose = await PoseSession.create({
      reps,
      feedback,
      poseId,
      userId: req.user.id,
      score,
    });

    res.send(pose);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
