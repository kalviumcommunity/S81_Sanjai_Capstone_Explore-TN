const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
  imagePath: { type: String, required: true },
  placeName: { type: String, required: true },
  district: { type: String, required: true },
  cost: { type: Number, required: true },
  isLegal: { type: Boolean, default: true },
  note: { type: String }
}, { _id: false });

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  images: [ImageSchema] 
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
