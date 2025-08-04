const  mongoose  = require("mongoose")


const userSchema=mongoose.Schema({
    name:{
        type: String,
        required: true
    },

    email:{
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now()
    },
    isActivated: {
        type: Boolean,
        default: false
    },
    favorites: [{ type: String }]

})



const userModel=mongoose.model("user",userSchema)

module.exports=userModel