const { Router } = require("express");
const templateController=Router();
const {TemplateModel}=require("../models/Template.model");
const {decryptToken}=require("../utils/utils");
const {UserModel}=require("../models/User.model")


// <----------------------------// API for storing template into MongoDB --------------------->
templateController.post("/save-template",async(req,res)=>
{
    if(!req.headers.authorization){
        return res.send("Please login again")
    }
    const token = req.headers.authorization.split(" ")[1]
    const user=decryptToken(token);
    const {templateName,questions} = req.body;
    try{
        const template = new TemplateModel({
            adminId:user.userId,templateName,questions});
           
         await template.save();
            
         const updateUser= await UserModel.findOneAndUpdate({_id:user.userId},{$push:{templateCreated:{templateId:template._id,templateName}}});
         
         res.status(200).json({msg :"Template saved successfully"})
      }
      catch(err){ 
       res.status(400).send({msg: "Something went wrong, please try again"});
      }
})


// <----------------------------// API for fetching template from MongoDB created by that user--------------------->

templateController.get("/get-template/:templateId",async(req,res)=>
{
    if(!req.headers.authorization){
        return res.send("Please login again")
    }
    const {templateId}=req.params;
    const token = req.headers.authorization.split(" ")[1]
    const user=decryptToken(token);
    const template= await TemplateModel.findById({_id:templateId});
    if(template && user.userId==template.adminId)
    res.status(200).send({msg:"success",template});
    else if(user.userId!=template.adminId)
    res.status(401).send({msg:"Unauthorized access"})
    else if(!template)
    res.status(404).send({msg:"Template not found"})
    else
    res.status(400).send({msg:"Something went wrong while getting template"});
})

module.exports={templateController}
