const { StatusCodes } = require('http-status-codes');
const User = require('../models/User');

const registerUser = async (req, res) => {
  const newUser = await User.create(req.body);
  const token = await newUser.createToken();
  res.status(StatusCodes.CREATED).json({ newUser, token });
};

const loginUser = async (req, res) => {
  const user = await User.find(req.body);
  const token = await user.createToken();
  res.status(StatusCodes.OK).json({ user, token });

  res.send('login');
};

module.exports = { registerUser, loginUser };
