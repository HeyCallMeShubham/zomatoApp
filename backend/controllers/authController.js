 
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const  UserModel  = require("../models/UserModel");
const { errorHandler } = require("../utils/error");



  const Google = async (req, res, next) =>{

    console.log(req.body)

   try{

   const user = await UserModel.findOne({email:req.body.email})

     if(user){

      const token = jwt.sign({id:user._id}, process.env.SECRETKEY, {expiresIn:'5m'})

      const {password, ...rest} = user._doc

      ///const expiryDate = new Date(Date.now() + 3000)

       res.status(201).json({token:token, user:rest, hell:'jhkjfjxcvjoxco'})

     }else{
     
      const password = 'r#43i39#4%*&rtw'

      const hashedpassword = bcrypt.hashSync(password, 10)

       const newUser = await UserModel.create({

        name:req.body.name.split(" ").join("").toLowerCase() + Math.floor(Math.random * 10000).toString(36).slice(-8),
        email:req.body.email,
        password:hashedpassword

       })


       const token = jwt.sign({id:newUser._id}, process.env.SECRETKEY, {expiresIn:'5m'})

       res.status(201).json({token:token, user:newUser});



     }

   }catch(err){

    next(err)

   }


}



module.exports = Google 