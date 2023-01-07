const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "Please provide name"],
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    require: [true, "Please provide email"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
    unique: true,
  },
  password: {
    type: String,
    require: [true, "Please provide password"],
    minlength: 6,
  },
});

// we set a Mongoose Middleware to execute functions before save on the database
// we can access the model Document through the 'this' keyword
// infos: https://mongoosejs.com/docs/middleware.html#pre
UserSchema.pre("save", async function () {
  // we call the 'genSalt' method to generate the hashing base
  // the '10' is the default value, bigger the number, more secure it is, but more proccessing power required
  const salt = await bcrypt.genSalt(10);

  // we call the 'hash' method to execute the hashing to the password, using the salt as base
  // we replace the password that is coming through the "create" method with the hashed one
  this.password = await bcrypt.hash(this.password, salt);
});

// we create a method that can be called in any Document instance
// in this case, we are calling after creating the user Document (see 'controllers/auth.js')
// infos: https://mongoosejs.com/docs/middleware.html#types-of-middleware
UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, name: this.name },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LIFETIME }
  );
};

module.exports = mongoose.model("User", UserSchema);
