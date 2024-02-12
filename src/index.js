var express = require("express");
var path = require("path");
var bcrypt = require("bcrypt");
var collection = require("./config");

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("login");
});
app.get("/login", (req, res) => {
  res.render("login");
});
app.get("/signup", (req, res) => {
  res.render("signup");
});
app.post("/signup", async (req, res) => {
  const data = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  };
  const existUser = await collection.findOne({ name: data.username });
  if (existUser) {
    res.send("user is already exist");
  } else {
    // hash the password using bcypt
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);
    data.password = hashedPassword;

    const userData = await collection.insertMany(data);
    console.log(userData);
  }
});
app.post("/login", async (req, res) => {
  try {
    const check = await collection.findOne({ name: req.body.username });
    if (!check) {
      res.send("user not found");
    }
    // password compare
    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      check.password
    );
    if (isPasswordMatch) {
      res.render("home");
    } else {
      res.send("wrong password");
    }
  } catch {
    res.send("wrong details");
  }
});
var port = 5000;
app.listen(port, () => {
  console.log(`sever is connected in port ${port} `);
});
