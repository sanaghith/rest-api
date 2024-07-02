const express = require("express");
const mongoose = require("mongoose");
const User = require("./model/user.schema");
const app = express();
app.use(express.json());
require("dotenv").config();

const Port = process.env.Port || 8000;

mongoose
  .connect(process.env.URI)
  .then(() => console.log("database is connected"))
  .catch((err) => console.log(`err`, err));

// add new user
app.post("/new-user", (req, res) => {
  const { firstName, lastName, email, age } = req.body;
  console.log("firstName", firstName);
  console.log("lastName", lastName);
  console.log("email", email);
  console.log("age", age);
  res.json("success");

  const newPerson = new User(req.body);
  newPerson
    .save()
    .then(() => res.status(200).json("user created successfuly"))
    .catch((err) => console.log("err", err));
});

app.delete("/delete-user/:id", (req, res) => {
  console.log(req.params.id);
  User.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json("user deleted successfuly"))
    .catch((err) => console.log("err", err));
});

app.put("/update-user/:id", (req, res) => {
  console.log(req.params.id);
  const { firstName, lastName, email, age } = req.body;

  User.updateOne({ _id: req.params.id }, { $set: req.body })
    .then(() => res.status(200).json("user updated successfuly"))
    .catch((err) => console.log("err", err));
});


app.get("/get-all-users",(req,res)=>{
  User.find()
  .then((data) => res.status(200).json(data))
  .catch((err) => console.log("err", err));
})

app.get("/get-one/:firstName",(req,res)=>{
  User.findOne({firstName:req.params.firstName})
  .then((data) => res.status(200).json(data))
  .catch((err) => console.log("err", err));
})


app.listen(Port, (err) => {
  err ? console.log("err", err) : console.log(`server is running on ${Port}`);
});
