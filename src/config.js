var mongoose = require("mongoose");
var connect = mongoose.connect("mongodb://localhost:27017/login-tut");

// check the database connection
connect
  .then(() => {
    console.log("database is connected successfully");
  })
  .catch(() => {
    console.log("database is not connected successfully");
  });

//   create the schema
const loginSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const loginModel = new mongoose.model("user", loginSchema);
module.exports = loginModel;
