
const mongoose = require('mongoose');



const userOrderSchema = new mongoose.Schema({
    
    foodCart:[{

        productTitle:String,
        price:Number,
        quantity:Number,
        desc:String,
        brand:String, 
        category:String,

    }],

    address:{
    fullname:String,
     street:String,
     city:String, 
     state:String, 
     country:String,
     email:String,
     landmark:String,
     pincode:Number,

},

 paymentMethod:{type:String},

deliveryStatus:{type:String, default:"none"},

})



const userOrderModel = new mongoose.model('highfitUserOrder', userOrderSchema)


module.exports = {

userOrderModel,
    
}





