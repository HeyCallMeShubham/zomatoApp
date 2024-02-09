
const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const UserModel  = require("../models/UserModel");

const ErrorHandler = require('../utils/ErrorHandler');

const { tryCatch } = require("../utils/tryCatch");

const stripe = require("stripe")(process.env.STRIPE_SECRET)






const Register = tryCatch(async(req, res, next) =>{
 
    
  const checkuserExist = await UserModel.findOne({email:req.body.email}) 
    
  if(checkuserExist){

    return next(ErrorHandler(400, 'a user already exists with this email'))
       
 }

      const hashedpassword = bcrypt.hashSync(req.body.password, 10 )  
 
 
      const customer = await stripe.customers.create({

        email:req.body.email
          
       },{
   
        apiKey:process.env.STRIPE_SECRET
   
       })
   
      const Register = await UserModel.create({
         
         
          name:req.body.name,
          email:req.body.email,
          userprofile:req.body.profileimg,
          customerStripeId:customer.id,
          password:hashedpassword,
        
         
       })
    
    
    res.status(201).json({message:'user created successfully'})
       


})



{/*

const Register = async(req, res, next) =>{

    try{
      
        const checkuserExist = await UserModel.findOne({email:req.body.email}) 
      
        if(checkuserExist){
    
        
          return next(ErrorHandler(400, 'a user already exists with this email'))
             
    
       /// throw new Error("user already exist with this email")
    
       }
      
         const hashedpassword = bcrypt.hashSync(req.body.password, 10 )  
          
        const Register = await UserModel.create({
           
           
            name:req.body.name,
            email:req.body.email,
            userprofile:req.body.profileimg,
            password:hashedpassword,
          
           
         })
      
      
      res.status(201).json({message:'user created successfully'})
      



    }catch(err){

    return next(err)


    }
      
  }

 
*/}



// expires in 1 day 


const expiresin = 86400000




const Login = tryCatch(async(req, res, next) =>{


    const validuser = await UserModel.findOne({email:req.body.email});

     if(!validuser) return next(ErrorHandler(404, 'user with this email not found'))
       
     const validPassword = bcrypt.compareSync(req.body.password, validuser.password)

     if(!validPassword) return next(ErrorHandler(401, 'credentials did not match '))

     const token = jwt.sign({id:validuser._id, email:validuser.email}, process.env.SECRETKEY, {expiresIn:'1d'})

     const {password, ...rest} = validuser._doc

     const cookieOptions = {expires:new Date(Date.now() + expiresin), httpOnly:true}

      res.cookie('zomato_cookie', token, cookieOptions, {httpOnly:true, secure:false}).status(200).json({token:token, info:rest})
 
    // console.log(rest)

     return next()

 
 }
)








{/*

const Login = async(req, res, next) =>{

  console.log(req.body)

  try{

    const validuser = await UserModel.findOne({email:req.body.email});

     if(!validuser) return next(ErrorHandler(404, 'user with this email not found'))
       
     const validPassword = bcrypt.compareSync(req.body.password, validuser.password)

      if(!validPassword) return next(ErrorHandler(401, 'credentials did not match '))
 
    const token = jwt.sign({id:validuser._id}, process.env.SECRETKEY, {expiresIn:'2d'})

     const {password, ...rest} = validuser._doc

      const cookieOptions = {expires:new Date(Date.now() + expiresin),  httpOnly:true}

       res.cookie('zomato_cookie', token, cookieOptions, {httpOnly:true, secure:false} ).status(200).json({token:token, info:rest})
 
     console.log(rest)

  }catch(err){

    console.log(err)

    return next(err)

   // res.status(500).json(err.message)

  }    


 }


*/}

const updateUser = async (req, res, next) =>{

  console.log(req.body)

  if(req.user.id !== req.params.id){

    //res.status(401).json('you can update only your account');

    return next(ErrorHandler(401, "you can update only your account"))
    
  }

   try{

    if(req.body.password){

      req.body.password = bcrypt.hashSync(req.body.password, 10)

    }


    const updatedUser = await UserModel.findByIdAndUpdate(req.params.id, {$set:{name:req.body.name, email:req.body.email, password:req.body.password}}, {new:true})

    res.status(200).json(updatedUser)

   }catch(err){

    res.status(401).json({message:"you can only change your account"})

     next(err)

    }

  }





const getUser = async (req, res) =>{
 
   try{
 
    console.log(req.user)

    const foundUser = await UserModel.findOne({_id:req.params.userId})

    res.status(200).json(foundUser)

   }catch(err){

    res.status(401).json({message:"you can only change your account"})


 }

}




 



 
 
 module.exports = {

   Register,
   Login, 
   updateUser,
   getUser

 }








