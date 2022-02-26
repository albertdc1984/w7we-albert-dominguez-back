const express = require("express");
const loginUser = require("../controllers/loginController");
const { getAllUsers, getOneUser } = require("../controllers/usersController");

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:idUser", getOneUser);
router.post("/login", loginUser);

module.exports = router;
