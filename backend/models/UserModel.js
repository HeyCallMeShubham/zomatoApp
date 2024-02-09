

const mongoose = require('mongoose')




const UserSchema = new mongoose.Schema({

  name:String,
  profileimg:String,
  
  email:String,

  customerStripeId:{type:String,required:true},

  plan:{type:String,enum:["none", "basic", "Premium"]},

  password:String,

},{timestamps:true})




   const UserModel = new mongoose.model("zomatouser", UserSchema) 

   module.exports = UserModel











