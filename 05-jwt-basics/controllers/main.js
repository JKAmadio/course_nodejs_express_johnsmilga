// library that provides full support to web token
const jwt = require("jsonwebtoken");
const { BadRequestError } = require("../errors");

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    throw new BadRequestError("Please provide username and password");

  // random id created just because in this projet we are not using any database
  const id = Math.floor(Math.random() * 100000);

  // we are using Json Web Token
  // the "sign" method requires two arguments and one optional
  // 1. payload: infos we want to provide
  //    a. NEVER pass the password
  //    b. ALWAYS keep short the data passed
  // 2. secret string: any string used as secret (HARD, LONG, UNGUESSABLE)
  // 3. options
  // https://jwt.io/
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  // in a real project we will save this token at the localStorage
  // and anytime the user access any feature that needs to be authorized
  // we send this token throw the Autorization request header
  // format: Autorization: Bearer <token>
  res.status(201).json({ msg: "user created", token });
};

const dashboard = async (req, res) => {
  // this function will only be launched if the authMiddleware reaches the "next" keyword
  // check the './routes/main.js' file
  const luckyNumber = Math.floor(Math.random() * 100);

  res.status(200).json({
    // in the authMiddleware we created a "user" property for req
    msg: `Hello, ${req.user.username}`,
    secret: `Here is your authorized data, your lucky number is: ${luckyNumber}`,
  });
};

module.exports = {
  login,
  dashboard,
};
