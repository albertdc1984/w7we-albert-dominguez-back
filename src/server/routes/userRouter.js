const express = require("express");
const multer = require("multer");
const loginUser = require("../controllers/loginController");
const userSignIn = require("../controllers/signInController");
const { getAllUsers, getOneUser } = require("../controllers/usersController");
const auth = require("../middlewares/auth");

const upload = multer({ dest: "public/" });
const router = express.Router();

router.get("/", auth, getAllUsers);
router.get("/:idUser", auth, getOneUser);
router.post("/login", loginUser);
router.post("/signin", upload.single("image"), userSignIn);

module.exports = router;
