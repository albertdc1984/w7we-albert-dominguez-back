const express = require("express");
const loginUser = require("../controllers/loginController");
const userSignIn = require("../controllers/signInController");
const { getAllUsers, getOneUser } = require("../controllers/usersController");
const auth = require("../middlewares/auth");

const router = express.Router();

router.get("/", auth, getAllUsers);
router.get("/:idUser", auth, getOneUser);
router.post("/login", loginUser);
router.post("/signin", userSignIn);

module.exports = router;
