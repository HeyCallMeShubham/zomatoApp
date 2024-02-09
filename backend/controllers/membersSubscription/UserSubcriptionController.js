const subscirbeUserPlanModel = require("../../models/SubscribeUserPlanModel")

const { tryCatch } = require("../../utils/tryCatch")


const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

 
const ErrorHandler = require("../../utils/ErrorHandler");
 

const stripe = require("stripe")(process.env.STRIPE_SECRET)






 const createUserPlan = async(req, res, next) =>{

    try{

    
  const checkuserExist = await subscirbeUserPlanModel.findOne({email:req.body.email}) 
    
  if(checkuserExist){

    return next(ErrorHandler(400, 'a user already exists with this email'))
       
 }

      const hashedpassword = bcrypt.hashSync(req.body.password, 10 )  
 
 
      const customer = await stripe.customers.create({

        email:req.body.email
          
       },{
   
        apiKey:process.env.STRIPE_SECRET
   
       })
   
      const Register = await subscirbeUserPlanModel.create({
         
         
          name:req.body.name,
          email:req.body.email,
          customerStripeId:customer.id,
          password:hashedpassword,
        
         
       })
    
    
    res.status(201).json({message:'user created successfully'})
       


    }catch(err){

     console.log(err)

    }



 }  





 const expiresin = 86400000


 const PlannedLogin = tryCatch(async(req, res, next) =>{


    const validuser = await subscirbeUserPlanModel.findOne({email:req.body.email});

     if(!validuser) return next(ErrorHandler(404, 'user with this email not found'))
       
     const validPassword = bcrypt.compareSync(req.body.password, validuser.password)

      if(!validPassword) return next(ErrorHandler(401, 'credentials did not match '))


    const token = jwt.sign({id:validuser._id, email:validuser.email, userplan:validuser.plan}, process.env.ZOMATO_PLANNED_USER_SECRET_KEY, {expiresIn:'1d'})

     const {password, endDate, ...rest} = validuser._doc

      const cookieOptions = {expires:new Date(Date.now() + expiresin),  httpOnly:true}

      res.cookie('zomato_planned_user_cookie', token, cookieOptions, {httpOnly:true, secure:false}).status(200).json({token:token, info:rest})
 
      // console.log(rest)

     return next()

 
 }
)




const updateUserSubscription = async(req, res) =>{

   console.log(req.body)

    try{
   
     const updatedUserPlan = await subscirbeUserPlanModel.findByIdAndUpdate({_id:req.user.id},{$set:{plan:req.body.plan}})
     
    res.json(updatedUserPlan)

    }catch(err){

    console.log(err)

    }
 
}






module.exports = {

   updateUserSubscription,
   createUserPlan,
   PlannedLogin

}






















