const jwt = require("jsonwebtoken");
const chalk = require("chalk");
const bcrypt = require("bcrypt");
const debug = require("debug")("social:login:");
const User = require("../../database/models/User");

const loginUser = async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    const error = new Error("User not found");
    error.code = 401;
    debug(chalk.bgYellowBright.green(error));
    return next(error);
  }
  console.log(password, user.password);
  const rightPassword = await bcrypt.compare(
    "hola",
    "2b$10$hWefZZ7evSaKHrxEsPq3q.6CdXIVuhisFGBaheD8Do1wCimZLshQG"
  );
  console.log(rightPassword);
  if (!rightPassword) {
    const error = new Error("User not found");
    error.code = 401;
    debug(chalk.bgYellowBright.black(error));
    return next(error);
  }
  // eslint-disable-next-line no-underscore-dangle
  const userdata = { name: user.name, id: user._id };
  const token = jwt.sign(userdata, process.env.JWT_SECRET, {
    expiresIn: "4d",
  });
  return res.json({ token });
};

module.exports = loginUser;
