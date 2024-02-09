
const mongoose = require("mongoose");




const addressSchema = new mongoose.Schema({

   fullname:String,
   email:String,
   country:String,
   city:String,
   street:String,
   state:String,
   pincode:String,
   userId:{type:mongoose.Schema.Types.ObjectId, ref:"userModel"}

})


const addressesModel = new mongoose.model('highfituserAddresse', addressSchema) 


module.exports = addressesModel












