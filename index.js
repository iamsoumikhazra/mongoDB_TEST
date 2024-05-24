const express = require("express");
// const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
app.use(express.json());

const DB_URL = process.env.MDB;
const PORT = process.env.PORT;
// const jwtPassword = process.env.JWTP;

mongoose.connect(DB_URL);
// console.log(DB_URL)

const User = mongoose.model("Users", {
  name: String,
  email: String,
  password: String,
});

app.post("/signup", async(req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;
  const existingUser = await User.findOne({email:email})
  if(existingUser){
    return res.status(400).send("User already Exist.")
  }

  const user = new User({
    name: name,
    email: email,
    password: password,
  });
  user.save();
  res.json({"msg":"user create successfully"})
});

app.listen(PORT, () => {
  console.log(`Server listening on PORT: ${PORT}`);
});
