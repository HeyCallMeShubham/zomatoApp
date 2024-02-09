

const restaurantModel = require("../../models/RestaurantsModel")
const foodItemModel = require("../../models/zomatoFoodItemsModel")
const ErrorHandler = require("../../utils/ErrorHandler")
const {tryCatch} = require("../../utils/tryCatch")


const registerRestaurant = tryCatch(async(req, res,next) =>{

    console.log(req.user)

    if(req.user.userplan !== "none"){
        
        const checkrestaurantexist = await restaurantModel.findOne({restaurantId:req.body.restaurantdata.restaurantId})
        
        if(checkrestaurantexist) return next(ErrorHandler(400, "you have already created your account "))
          
        const restaurant = await restaurantModel.create({...req.body.restaurantdata})
          
        if(!restaurant) return next(ErrorHandler(500, " build failed "))
          
        res.status(200).json(restaurant)
           

    }        
    
    console.log("you cannot access this ")

})


const getCityRestaurants = async(req, res,next) =>{

    console.log(req.user)

    try{
        const filter = req.query.filter || ""
    
    const query = {
    
            availCategories:{$regex:filter, $options:'i'},
            restaurantCity:{$regex:req.params.city, $options:'i'},       
    
    }

   /// const ddd = await foodItemModel.aggregate([{$lookup:{from:"zomatoregisteredrestaurant", localField:"foodByRestaurant", foreignField:"restaurantId", as:"restaurant"}}]).pretty()
    
   const cityRestaurants = await restaurantModel.find({$or:[{restaurantCity:req.params.city}, query]})

    if(!cityRestaurants) return next(ErrorHandler(500, "no restaurants in the city"))
    
    res.status(200).json(cityRestaurants)


    }catch(err){

        console.log(err)

    }
    


}






const getAllRestaurants = tryCatch(async(req, res,next) =>{

    const filter = req.query.filter || ''
 


const ITEM_PER_PAGE= 2

const query = {
      
 availCategories:{$regex:filter, $options:'i'}

}


const cityRestaurants = await restaurantModel.find(query)


if(!cityRestaurants) return next(ErrorHandler(500, " build failed "))


res.status(200).json(cityRestaurants)


})





const getOneRestaurant = tryCatch(async(req, res,next) =>{


    let fooditems = await foodItemModel.find({})


    const restaurant = await restaurantModel.findOne({_id:req.params.id})

    res.json({restaurant:restaurant, fooditem:fooditems})

    if(!restaurant) return next(ErrorHandler(404, "cant order from this because restaurant does not exist's any longer"))
     

})














module.exports = {

   registerRestaurant,
   getCityRestaurants,
   getAllRestaurants,
   getOneRestaurant


}












{/*




const getCityRestaurants = tryCatch(async(req, res,next) =>{
    
    const filter = req.query.filter || ""

const query = {

        availCategories:{$regex:filter, $options:'i'},
        restaurantCity:{$regex:req.params.city, $options:'i'},       

}
 

///const restaurantMenu = await foodItemModel.find({}).populate("zomatoregisteredrestaurant")


///console.log(restaurantMenu,'menu')


const cityRestaurants = await restaurantModel.find({restaurantCity:req.params.city} && query).populate({restaurantId:"zomatofooditem"})
///.populate({"zomatoregisteredrestaurant"})

console.log(cityRestaurants)

//if(!cityRestaurants) return next(ErrorHandler(500, " build failed "))

res.status(200).json(cityRestaurants)


})







*/}








