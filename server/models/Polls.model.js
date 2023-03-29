const { text } = require("express");
const mongoose = require("mongoose");

const OptionSchema = new mongoose.Schema({
    option: String,
    votes: {
        type: Number,
        default: 0
    }
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
    pollId : {type : Number},
    adminId : {type : Number},
    pollName:{type:String},
    templateName:{type:String},
    questions: [questionSchema],
    pollStatus : {type : Boolean},
    usersAttended:{type:Array},
    pollCreatedAt: {type:Date},
    pollEndsAt:{type:Date}
});

const templateSchema = new mongoose.Schema({
    templateId : {type : Number},
    adminId : {type : Number},
    templateName:{type:String},
    questions: [questionSchema],
    templateCreatedAt: {type:Date}
});

const  PollModel = mongoose.model("Poll", pollSchema);
const  TemplateModel = mongoose.model("template", templateSchema);

module.exports = {
    PollModel,TemplateModel
}