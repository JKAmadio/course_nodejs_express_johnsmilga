const express = require("express");
const router = express.Router();

const { login, register, deleteAllUsers } = require("../controllers/auth");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/").delete(deleteAllUsers);

module.exports = router;
