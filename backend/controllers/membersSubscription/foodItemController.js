 
const foodItemModel = require("../../models/zomatoFoodItemsModel");
const ErrorHandler = require("../../utils/ErrorHandler");
const { tryCatch } = require("../../utils/tryCatch");






const addFoodItem = tryCatch(async(req, res, next) =>{

     const AddedfoodItem = await foodItemModel.create({...req.body.foodDetails}) 
     
     if(!AddedfoodItem) return next(ErrorHandler(401, "couldnt add this item to your menu List try again"))

     res.status(201).json({successful:true, message:"item added to your restaurant menu list you can update it or its Information later you want"})
 

})



const getFoodItems = tryCatch(async(req, res, next) =>{

     console.log(req.user)

     const foodItems = await foodItemModel.find() 
 

     if(!foodItems) return next(ErrorHandler(401, "theres some technical issue we facing because of which we are unable to show you food item "))

     res.status(201).json(foodItems)
 

})













module.exports = {

    addFoodItem,
    getFoodItems


}




















