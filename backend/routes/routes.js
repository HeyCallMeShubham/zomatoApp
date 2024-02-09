

const express = require('express')
const { Register, authorizeUser, Login, updateUser, getUser } = require('../controllers/userController')
const verifyToken = require('../utils/userVerify')

const { registerRestaurant, getCityRestaurants, getAllRestaurants, getOneRestaurant } = require("../controllers/membersSubscription/restaurantController") 
const { addFoodItem, getFoodItems } = require('../controllers/membersSubscription/foodItemController')
 
const { updateUserSubscription, createUserPlan, PlannedLogin } = require('../controllers/membersSubscription/UserSubcriptionController')
const verifyPlannedUser = require('../utils/verifyPlannedUser')

 
  
 
const router = express.Router()



router.post('/registeruser', Register)

router.post('/loginuser', Login)

router.get('/getuser/:userId', verifyToken, getUser)





//// checkTokenExpiry 


router.get("/checktokenexpiry", )

 


//// member routes 

 


//// restaurant routes 

 
router.post('/registerrestaurant', verifyPlannedUser, registerRestaurant)

router.get("/getthisrestaurant/:id", getOneRestaurant)

router.get('/getcityrestaurants/:city', verifyToken, getCityRestaurants)

router.get("/getallrestaurants", getAllRestaurants) 





//// restaurant foods or food items route 


router.post("/addfoodItem", verifyToken, addFoodItem)

router.get("/getfooditems",  getFoodItems) 




//// planned users route 



router.post("/createplanneduser", createUserPlan)

router.post("/planneduserlogin", PlannedLogin)

router.put("/updateuserplan",updateUserSubscription)









module.exports = router











