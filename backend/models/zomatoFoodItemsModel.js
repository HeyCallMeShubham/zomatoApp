


const mongoose = require("mongoose")






const foodItemsSchema = new mongoose.Schema({

    foodByRestaurant:{type:mongoose.Schema.ObjectId, ref:"zomatoregisteredrestaurant"},
    restaurantName:String,
    restaurantCity:String,
    foodItemQuantity:{type:Number, default:1},
    restaurantState:String,
    vegOrNonVegCategory:{type:String, required:true,enum:["Veg","NonVeg"]},
    foodItemName:String,
    foodItemImage:String,
    foodItemDesc:String,
    foodItemRated:[{ratedBy:String, givenrating:Number}],
    totalRatings:{type:Number, default:0},
    foodItemPrice:Number,

})



const foodItemModel = new mongoose.model("zomatofooditem", foodItemsSchema)


module.exports = foodItemModel











