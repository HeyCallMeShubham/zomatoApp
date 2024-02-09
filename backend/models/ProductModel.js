
const mongoose = require('mongoose')



const FoodItemsSchema = new mongoose.Schema({

    title:String,
    desc:String,
    price:String,
    category:String,
    brand:String,
    restaurantid:String,
    
})



const productModel = new mongoose.model("zomatofoodItems", ProductSchema)


module.exports = productModel






