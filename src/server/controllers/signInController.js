const bcrypt = require("bcrypt");
const { initializeApp } = require("firebase/app");
const { getStorage } = require("firebase/storage");
const fs = require("fs");
const { ref, uploadBytes, getDownloadURL } = require("firebase/storage");
const path = require("path");
const User = require("../../database/models/User");
const firebaseConfig = require("../../../firebaseConfig");

const fireApp = initializeApp(firebaseConfig);
const storage = getStorage(fireApp);

const userSignIn = async (req, res) => {
  const newUser = req.body;
  console.log(req.body);
  console.log(req.file);
  newUser.password = await bcrypt.hash(newUser.password, 10);

  const oldFileName = path.join("images", req.file.filename);
  const newFileName = path.join("images", req.file.originalname);

  fs.rename(oldFileName, newFileName, () => {
    fs.readFile(newFileName, async (error, file, next) => {
      if (error) {
        next(error);
      }

      const fileRef = ref(storage, `${Date.now()}-${req.file.originalname}`);
      await uploadBytes(fileRef, file);

      const imageUrl = await getDownloadURL(fileRef);
      const newProfile = await User.create({
        name: req.body.name,
        username: req.body.username,
        password: req.body.password,
        image: imageUrl,
      });
      res.json(newProfile);
      /* await User.findByIdAndUpdate(newUser.id, {
        image: imageUrl,
      }); */
    });
  });
  console.log(newUser);
};

module.exports = userSignIn;
