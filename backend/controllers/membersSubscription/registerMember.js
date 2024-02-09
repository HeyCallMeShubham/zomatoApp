const mongoose = require("mongoose")

const {tryCatch} = require('../../utils/tryCatch')
const registeredMemberModel = require("../../models/RegisteredMembersModel");
const ErrorHandler = require("../../utils/ErrorHandler");






const registerMember = tryCatch(async(req, res, next) =>{

    console.log(req.body.memberdetails)

     const memberAlreadyExist = await registeredMemberModel.findOne({registeredEmail:req.body.memberdetails.registeredEmail})

   if(memberAlreadyExist) return next(ErrorHandler(400, "member already exists"))

    const registeredMember = await registeredMemberModel.create({...req.body.memberdetails})

    res.status(200).json(registeredMember)
 

})















module.exports = {
 
    registerMember


}



