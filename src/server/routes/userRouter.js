const express = require("express");
const loginUser = require("../controllers/loginController");
const userSignIn = require("../controllers/signInController");
const { getAllUsers, getOneUser } = require("../controllers/usersController");

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:idUser", getOneUser);
router.post("/login", loginUser);
router.post("/signin", userSignIn);

module.exports = router;
