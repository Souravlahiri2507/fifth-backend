const express = require("express");
const { connection } = require("./db");
require("dotenv").config();
const cors = require("cors");
const { userRouter } = require("./routes/userRouter");
const { auth } = require("./middlewares/auth");

const app = express();
app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Welcome Home");
});

app.use("/users", userRouter);

app.use(auth); //Middleware

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("connnected to db");
  } catch (error) {
    console.log({ msg: error.message });
  }
  console.log(`server is running at port ${process.env.PORT}`);
});
