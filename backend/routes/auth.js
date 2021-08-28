const passport = require("passport");
const express = require("express");
const bcrypt = require("bcryptjs");

const router = express.Router();

const authController = require("../controllers/auth");

router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get("/auth/google/callback", passport.authenticate("google"));

router.get("/api/logout", (req, res) => {
  req.logout();
  res.send("Logged out successfully");
});

router.post(
  "/auth/login",
  authController.postLogin
  // async (req, res, next) => {
  // const { email, password } = req.body;
  // const hash = await bcrypt.hash("password", 10);
  // console.log("hashed password: ", hash);
  // bcrypt.compare(password, hash, (err, isSame) => {
  //   if (err) {
  //     console.log("Something went wrong. Try again.");
  //   }
  //   res.send(isSame);
  // });
  // }
);

router.post("/auth/signup", authController.postSignUp);

router.get("/api/current_user", (req, res) => {
  res.send(req.user);
});

module.exports = router;
