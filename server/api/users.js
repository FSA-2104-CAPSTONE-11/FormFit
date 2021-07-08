const router = require("express").Router();
const {
  models: {User},
} = require("../db");
module.exports = router;
const requireToken = require("./gatekeeping");

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ["id", "username"],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

//GET api/users/:id (protected for logged in user)
router.get("/:id", requireToken, async (req, res, next) => {
  try {
    const user = await User.findOne({where: {id: req.params.id}})
    res.json(user)
  } catch (error) {
    next(err);
  }
});

// PUT api/users/:id (protected for logged in user)
router.put("/:id", requireToken, async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.params.id,
      },
    });
    await user.update(req.body);
    res.json(user);
  } catch (error) {
    next(err);
  }
});
