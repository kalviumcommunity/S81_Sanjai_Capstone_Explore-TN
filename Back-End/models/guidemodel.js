const  mongoose  = require("mongoose")

const guideSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    phone: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    languages: {
      type: [String],
      required: true
    },
    experience: {
      type: Number,
      default: 0
    },
    bio: {
      type: String
    },
    photo: {
      type: String 
    },
     userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
})

const guideModel=mongoose.model("Guide",guideSchema)
module.exports=guideModel