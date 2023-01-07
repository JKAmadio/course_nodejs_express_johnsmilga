const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const register = async (req, res) => {
  const user = await User.create(req.body);

  // we evolke the createJWT instance method
  // see: 'models/User.js'
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  // validate that both email and password were passed by the user
  if (!email || !password)
    throw new BadRequestError("Please provide email and password");

  // search the user by its email (unique property)
  const user = await User.findOne({ email });
  if (!user) throw new UnauthenticatedError("Invalid credentials");

  // comparing the password from register and login
  const isMatch = await user.comparePassword(password);
  if (!isMatch) throw new UnauthenticatedError("Invalid credentials");

  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};

const deleteAllUsers = async (req, res) => {
  const users = await User.deleteMany();
  if (users.ok !== 1)
    throw new BadRequestError("Something went wrong, please try again");
  return res
    .status(200)
    .json({ success: true, msg: `${users.deletedCount} users were deleted` });
};

module.exports = {
  register,
  login,
  deleteAllUsers,
};
