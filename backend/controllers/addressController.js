 
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const addressesModel = require("../models/UserAddressModel")


const addAddress = async(req,res) =>{

  try{

   const address = await addressesModel.create({...req.body})

    if(!address) return res.status(401).json("couldnt add address")
    
    console.log('done')

    res.status(201).json("address added successfully")


  }catch(err){

    console.log(err)
   

  }


}




const getUserAddress = async(req,res) =>{

  try{

   const userAddress = await addressesModel.find({userId:req.body.userId})

    if(!userAddress) return res.status(401).json("couldnt add address")
     
    res.status(201).json({message:"address got successfully", addresses:userAddress})


  }catch(err){

    console.log(err)
   

  }


}





module.exports = {

    addAddress,
    getUserAddress


}













