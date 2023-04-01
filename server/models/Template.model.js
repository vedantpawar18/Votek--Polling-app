const { text } = require("express");
const mongoose = require("mongoose");


const questionSchema= new mongoose.Schema({
    question:String,
    type:String,
    maxSelections: {type:Number, default:1},
    options:Array,
})

const templateSchema = new mongoose.Schema({
    adminId : {type : String},
    templateName:{type:String},
    questions: [questionSchema],
});

const  TemplateModel = mongoose.model("template", templateSchema);

module.exports = {
   TemplateModel
}