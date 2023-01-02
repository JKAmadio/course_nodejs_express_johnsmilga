const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  const { name, email, password } = req.body;

  // we call the 'genSalt' method to generate the hashing base
  // the '10' is the default value, bigger the number, more secure it is, but more proccessing power required
  const salt = await bcrypt.genSalt(10);

  // we call the 'hash' method to execute the hashing to the password, using the salt as base
  const hashedPassword = await bcrypt.hash(password, salt);
  const tempUser = { name, email, password: hashedPassword };

  const user = await User.create(tempUser);

  res.status(StatusCodes.CREATED).json(user);
};

const login = async (req, res) => {
  res.send("login user");
};

module.exports = {
  register,
  login,
};
