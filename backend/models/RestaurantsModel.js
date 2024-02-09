
const mongoose = require("mongoose");




const restaurantSchema = new mongoose.Schema({
   

    restaurantId:{type:mongoose.Schema.ObjectId, ref:"registeredzomatomember" },
    restaurantName:String,
    restaurantPercentOff:Number,
    restaurantImage:String,
    restaurantState:String,
    restaurantDesc:String,
    restaurantCountry:String,
    restaurantCity:String,
    restaurantEmail:String,
    availCategories:[String],
    restaurantOwnerNumber:Number,
    restaurantRated:[{ratedBy:String, givenrating:Number}],
    totalRatings:{type:Number, default:0}


});





const restaurantModel = new mongoose.model('zomatoregisteredrestaurant', restaurantSchema)


module.exports = restaurantModel









