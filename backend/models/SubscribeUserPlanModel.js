

const mongoose = require("mongoose");





const SubscribeUserPlanSchema = new mongoose.Schema({

    name:String,
    email:String,
    password:String,
    plan:{type:String,enum:["none","basic", "Premium"], default:"none"},
    customerStripeId:{type:String,required:true},
    endDate:{type:Date, default:Date.now}


})



const subscirbeUserPlanModel = new mongoose.model("subscribeuserplan", SubscribeUserPlanSchema)


module.exports = subscirbeUserPlanModel






