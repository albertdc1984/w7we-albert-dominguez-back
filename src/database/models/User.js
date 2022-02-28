const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
  },
  username: {
    type: String,
    required: true,
    minlength: 3,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  friends: {
    type: [Schema.Types.ObjectId],
    required: false,
  },
  enemies: {
    type: [Schema.Types.ObjectId],
    required: false,
  },
  image: {
    type: String,
    required: false,
  },
});

const User = model("User", userSchema, "users");

module.exports = User;
