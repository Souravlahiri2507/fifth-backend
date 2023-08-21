const express = require("express");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../model/userModel");
const bcrypt = require("bcrypt");

const userRouter = express.Router();

userRouter.get("/", async (req, res) => {
  try {
    const user = await UserModel.find();
    res.status(200).send(user);
  } catch (error) {
    res.status(404).send({ msg: error.message });
  }
});

//register
userRouter.post("/register", (req, res) => {
  const { email, password, confirm_password } = req.body;
  try {
    bcrypt.hash(password, 5, async (err, hash) => {
      let user = new UserModel({
        email,
        password: hash,
        confirm_password,
      });
      await user.save();
      res.status(200).send({ msg: "a new user has been registerd" });
    });
  } catch (error) {
    res.status(404).send({ msg: error.message });
  }
});

//login
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await UserModel.find({ email });
    if (user.length > 0) {
      const passwordMatch = await bcrypt.compare(password, user[0].password);
      if (passwordMatch) {
        const token = jwt.sign(
          {
            userID: user[0]._id,
            exp: Math.floor(Date.now() / 1000) + 60 * 60,
          },
          "bruce"
        );
        res.status(200).send({
          msg: "Login Successful",
          token: token,
        });
      } else {
        res.status(404).send({ msg: "Wrong Credentials" });
      }
    }
  } catch (error) {
    res.status(404).send({ msg: error.message });
  }
});

module.exports = {userRouter};
