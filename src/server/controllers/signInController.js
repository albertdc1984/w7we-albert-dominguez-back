const bcrypt = require("bcrypt");
const { initializeApp } = require("firebase/app");
const { getStorage } = require("firebase/storage");
const fs = require("fs");
const { ref, uploadBytes, getDownloadURL } = require("firebase/storage");
const { path } = require("path");
const User = require("../../database/models/User");
const firebaseConfig = require("../../../firebaseConfig");

const fireApp = initializeApp(firebaseConfig);
const storage = getStorage(fireApp);

const userSignIn = async (req, res) => {
  const newUser = req.body;
  newUser.password = await bcrypt.hash(newUser.password, 10);
  const newProfile = await User.create(newUser);

  const oldFileName = path.join("public", req.file.filename);
  const newFileName = path.join("public", req.file.originalname);

  fs.rename(oldFileName, newFileName, () => {
    fs.readFile(newFileName, async (error, file, next) => {
      if (error) {
        next(error);
      }
      const fileRef = ref(storage, newFileName);
      await uploadBytes(fileRef, file);

      const imageUrl = await getDownloadURL(fileRef);

      await User.findByIdAndUpdate(newUser.id, {
        image: imageUrl,
      });
    });
  });

  res.json(newProfile);
};

module.exports = userSignIn;
