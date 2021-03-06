const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = mongoose.model("users");
const jwt = require("jsonwebtoken");
const { tokenSecret } = require("../config/keys");

exports.postSignUp = async (req, res, next) => {
  const { name, email, password } = req.body;
  User.findOne({ email: email }).then(async (existingUser) => {
    if (existingUser) {
      res
        .status(409)
        .send({ error: "User already exists. Please login instead." });
    } else {
      await bcrypt
        .hash(password, 10)
        .then(async (encryptedPassword) => {
          const newUser = new User({
            name,
            email,
            password: encryptedPassword,
          });

          const newToken = jwt.sign({ email: email }, tokenSecret, {
            expiresIn: "1h",
          });

          newUser.token = newToken;
          newUser.save();
          console.log("added user");
          res.status(200).send(newUser);
        })
        .catch((err) =>
          res.status(500).send({
            error: "Couldn't save user. Please try again.",
            details: err,
          })
        );
    }
  });
};

exports.postLogin = async (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then(async (existingUser) => {
      if (!existingUser) {
        res.status(403).send("Incorrect email");
      } else {
        await bcrypt.compare(
          password,
          existingUser.password,
          (err, doMatch) => {
            if (err) {
              res
                .status(500)
                .send({ error: "Coudln't login user.", details: err });
            }

            if (!doMatch) {
              res.status(403).send("Incorrect password");
            } else {
              const newToken = jwt.sign(
                { email, _id: existingUser._id },
                tokenSecret,
                {
                  expiresIn: "1h",
                }
              );

              existingUser.token = newToken;
              res.status(200).send(existingUser);
            }
          }
        );
      }
    })
    .catch((err) =>
      res.status(500).send({ error: "Coudln't login user.", details: err })
    );
};

exports.postLogout = (req, res, next) => {
  const userId = req.body.userId;
  User.findById(userId).then((user) => {
    user.token = "";
    req.user = null;
    user.save();
    res.status(200).send("Logged out successfully");
  });
};
