const User = require("../../database/models/User");

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (error) {
    next(error);
  }
};

const getOneUser = async (req, res, next) => {
  const { idUser } = req.params;
  try {
    const user = await User.findById(idUser);
    if (user) {
      res.json(user);
    } else {
      const error = new Error("User not found");
      error.code = 404;
      next(error);
    }
  } catch (error) {
    error.code = 400;
    next(error);
  }
};

module.exports = { getAllUsers, getOneUser };
