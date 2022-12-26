const express = require("express");
const router = express.Router();
const { login, dashboard } = require("../controllers/main");
const authMiddleware = require("../middleware/auth");

router.route("/login").post(login);

// in our case we will only check the authentication on this route
// so we can set the middleware direct here
// the main idea is that first the auth function will be executed
// and only when reach the "next" keyword will executee the "dashboard" function
router.route("/dashboard").get(authMiddleware, dashboard);

module.exports = router;
