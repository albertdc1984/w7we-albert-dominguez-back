const User = require("../../database/models/User");

const userSignIn = async (req, res) => {
  const newUser = req.body;
  const newProfile = await User.create(newUser);

  res.json(newProfile);
};

module.exports = userSignIn;
