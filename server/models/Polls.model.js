const { text } = require("express");
const mongoose = require("mongoose");

const OptionSchema = new mongoose.Schema({
    option: String,
    votes: {
        type: Number,
        default: 0
    },
    votedBy:Array
})

const questionSchema= new mongoose.Schema({
    question:String,
    type:String,
    maxSelections: {type:Number, default:1},
    totalVotes: {
        type: Number,
        default: 0
    },
    options:[OptionSchema],
})

const pollSchema = new mongoose.Schema({
    pollId : {type : String},
    adminId : {type : String},
    pollName:{type:String},
    templateName:{type:String},
    questions: [questionSchema],
    pollStatus : {type : Boolean},
    usersAttended:{type:Array},
    pollCreatedAt: {type:String},
    pollEndsAt:{type:String}
});

// const templateSchema = new mongoose.Schema({
//     adminId : {type : String},
//     templateName:{type:String},
//     questions: [questionSchema],
// });

const  PollModel = mongoose.model("Poll", pollSchema);
// const  TemplateModel = mongoose.model("template", templateSchema);



module.exports = {
    PollModel
}