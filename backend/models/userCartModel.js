

const mongoose = require('mongoose');




const UserCartSchema = new mongoose.Schema({

    productTitle:String,
    price:Number,
    brand:String,
    quantity:Number,
    desc:String,
    userId:{type:mongoose.Schema.Types.ObjectId, ref:"userModel"}

})


const UserCartModel = new mongoose.model("highfituserscart", UserCartSchema )



module.exports= UserCartModel







