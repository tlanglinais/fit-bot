const router = require("express").Router();
const passport = require("passport");

// router.get("/", () => console.log("auth route"));

router.get("/discord", passport.authenticate("discord"));

router.get(
  "/discord/redirect",
  passport.authenticate("discord"),
  (req, res) => {
    res.sendStatus(200);
    // res.redirect("http://localhost:3000");
  }
);

router.get("/", (req, res) => {
  if (req.user) res.send(req.user);
  else {
    res.status(401).send({ message: "Unauthorized" });
  }
});

module.exports = router;
