const bcrypt = require("bcrypt");
const User = require("../../database/models/User");

const userSignIn = async (req, res) => {
  const newUser = req.body;
  newUser.password = await bcrypt.hash(newUser.password, 10);
  const newProfile = await User.create(newUser);

  res.json(newProfile);
};

module.exports = userSignIn;
