const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email : {type : String },
    fullName : {type : String },
    password : {type : String},
    userRole: {type:String},
    pollsCreated: {type:Array}, 
    templateCreated: {type:Array}, 
    pollsAttended:{type:Array} 
});

const  UserModel = mongoose.model("User", userSchema);

module.exports = {
    UserModel
}
