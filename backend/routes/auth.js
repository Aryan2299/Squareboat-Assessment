const express = require("express");

const router = express.Router();

const authController = require("../controllers/auth");

router.post("/auth/login", authController.postLogin);

router.post("/auth/signup", authController.postSignUp);

router.post("/auth/logout", authController.postLogout);

module.exports = router;
