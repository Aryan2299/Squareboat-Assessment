const jwt = require("jsonwebtoken");
const { tokenSecret } = require("../config/keys");

const isAuth = (req, res, next) => {
  const token = req.query.token || req.body.token;

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const parsedUser = jwt.verify(token, tokenSecret);
    req.user = parsedUser;
    console.log("user: ", req.user);
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = isAuth;
