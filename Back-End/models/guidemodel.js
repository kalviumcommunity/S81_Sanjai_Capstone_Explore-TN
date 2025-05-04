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
      type: Number,
      required: true,
      unique: true
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
      type: String,
      required: true
    },
    photo: {
      type: String 
    }
})

const guideModel=mongoose.model("Guide",guideSchema)
module.exports=guideModel