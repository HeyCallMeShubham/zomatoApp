
const mongoose = require("mongoose");



  const orderSchema = new mongoose.Schema({

   orderId:{type:mongoose.Schema.Types.ObjectId},
  
   customerId:{type:mongoose.Schema.Types.ObjectId, ref:'zomatouser'},
   
 

  // items:[{
   // 
   // foodItemName:String,
    //foodItemPrice:Number,
    //foodItemQuantity:Number,
    //foodItemDesc:String,
    //foodByRestaurant:{type:mongoose.Schema.ObjectId, ref:'zomatoregisteredrestaurant'}, 
   /// category:String,

///}],




items:Array,
  
        address:{
         name:String,
         street:String,
         city:String, 
         state:String, 
         country:String,
         email:String,
         phone:Number,
         landmark:String,
         pincode:Number,
    
},
    
     selectedPaymentMethod:{type:String},

     totalAmount:Number,

     paymentStatus:{type:String, default:false},
    
    deliveryStatus:{type:String, default:"pending"},
    
    })
    
 


const orderModel = new mongoose.model("placedOrdersZomato", orderSchema)



module.exports = orderModel














