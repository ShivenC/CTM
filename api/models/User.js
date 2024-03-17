const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: String,
  email: { type: String, unique: true },
  number: Number,
  password: String,
  TFA: { type: String },
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
