const jwt = require("jsonwebtoken");
const { tokenSecret } = require("../config/keys");

const isAuth = (req, res, next) => {
  const token = req.query.token;

  if (!token) {
    return res.status(403).send("Please provide a token");
  }
  try {
    const parsedUser = jwt.verify(token, tokenSecret);
    req.user = parsedUser;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = isAuth;
