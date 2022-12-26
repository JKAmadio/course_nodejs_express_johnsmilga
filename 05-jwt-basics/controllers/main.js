// library that provides full support to web token
const jwt = require("jsonwebtoken");
const CustomAPIError = require("../errors/custom-error");

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    throw new CustomAPIError("Please provide username and password", 400);

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
  // we access the Autorization dictionary send on headers
  const authHeader = req.headers.authorization;

  // check if the authorization header exists and if it starts with Bearer
  if (!authHeader || !authHeader.startsWith("Bearer"))
    throw new CustomAPIError("No token provided", 401);

  // only get the token (remove 'Bearer' part)
  const token = authHeader.split(" ")[1];

  try {
    // after we confirm that an auth token is passed
    // we MUST verify that it's real with jwt's method "verify"
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const luckyNumber = Math.floor(Math.random() * 100);

    res.status(200).json({
      msg: `Hello, ${decoded.username}`,
      secret: `Here is your authorized data, your lucky number is: ${luckyNumber}`,
    });
  } catch (error) {
    throw new CustomAPIError("Unauthorized token", 401);
  }
};

module.exports = {
  login,
  dashboard,
};
