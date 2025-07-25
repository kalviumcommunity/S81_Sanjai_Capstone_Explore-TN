
const mongoose = require("mongoose");

const userPickSchema = new mongoose.Schema({
  username: { type: String, required: true },
  title: { type: String, required: true },
  location: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true }
}, { timestamps: true });

const UserPick = mongoose.model("UserPick", userPickSchema);
module.exports = UserPick;
