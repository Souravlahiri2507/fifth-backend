const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers.authorization;
  // console.log(token);
  if (token) {
    try {
      const decoded = jwt.verify(token, "bruce");
      req.body.userID = decoded.userID;
      next();
    } catch (error) {
      res.status(400).send({ msg: "Person isn't Authorized" });
    }
  } else {
    res.status(400).send({ msg: "Person isn't Authorized" });
  }
};
module.exports = { auth };
