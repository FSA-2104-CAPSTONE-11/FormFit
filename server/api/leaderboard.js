const router = require("express").Router();
const requireToken = require("./gatekeeping");
module.exports = router;
const { client } = require("../app");
let _ = require("lodash");

// GET api/leaderboard (protected for logged in user)
router.get("/", requireToken, (req, res, next) => {
  const args = ["overallLeaderboard", 0, 9, "withscores"];

  client.zrevrange(args, async (err, result) => {
    if (err) {
      console.log("is there an error?");
      res.status(404).send(err);
    } else {
      res.status(200).send(_.chunk(result, 2));
    }
  });
});

// GET api/leaderboard/rank (protected for logged in user)
router.get("/rank", requireToken, (req, res, next) => {
  const args = ["overallLeaderboard", req.user.username];

  client.zrevrank(args, async (err, result) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.json(result + 1);
    }
  });
});
