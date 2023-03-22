const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userId : {type : Number},
    email : {type : String },
    fullName : {type : String },
    password : {type : String},
    userRole: {type:String},
    pollsCreated: {type:Array},
    pollsAttended:{type:Array}, //[{pollId:641a7fa9670444ee3901c3e5, responseId:641a7fa9670444ee3901c3f8}]
});

const  UserModel = mongoose.model("User", userSchema);

module.exports = {
    UserModel
}