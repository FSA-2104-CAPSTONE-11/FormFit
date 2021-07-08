const router = require("express").Router();
module.exports = router;

router.use("/user", require("./user"));
router.use("/history", require("./history"));

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
