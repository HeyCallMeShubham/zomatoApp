const express = require('express')

const app = express()

require("dotenv").config()

const jwt = require('jsonwebtoken')

const cors = require('cors')

const mongoose = require("mongoose")

const cookieParser = require('cookie-parser')

const router = require('./routes/routes')

const verifyToken = require('./utils/userVerify')

const bodyParser = require('body-parser')

const connectDb = require("./config/database")
const errorMiddleware = require('./middlewares/Error')
const ErrorHandler = require('./utils/ErrorHandler')
const { tryCatch } = require('./utils/tryCatch')
const UserModel = require('./models/UserModel')
const { updateUserSubscription } = require('./controllers/membersSubscription/UserSubcriptionController')
const subscirbeUserPlanModel = require('./models/SubscribeUserPlanModel')
const foodItemModel = require('./models/zomatoFoodItemsModel')
const orderModel = require('./models/orderModel')

//mongoose.connect("mongodb+srv://shubham:mylife@cluster0.natwega.mongodb.net/")

connectDb()


const stripe = require("stripe")(process.env.STRIPE_SECRET)


app.use(cors({
  origin:"http://localhost:3000",
  methods:["GET","POST", "PUT", "DELETE"],
  credentials:true,
}))








{/*

const sig = request.headers['stripe-signature'];

 let data;

 let eventType;

 if(endpointSecret){

   let event;
   
     try {
       event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
       console.log("verified")
     } catch (err) {
       console.log(err)
       response.status(400).send(`Webhook Error: ${err.message}`);
       return;
     }

     data = event.data.object
     eventType = req.body.object

 }else{

    data = req.body.data.object
    eventType = req.body.object


 }

 // handle the event


 if(eventType == "checkout.session.completed"){


    //console.log(stripe.customers)

   // stripe.customers.retrieve(data.customer).then((customer) => {
     
     //console.log(customer)

     //console.log(data,'data')

    //}).catch((err) => console.log(err))

 }

 // Return a 200 response to acknowledge receipt of the event
 

 res.send().end();


*/}











app.use(bodyParser.json())

app.use(cookieParser())

app.use('/zomato', router)

app.use(bodyParser.urlencoded({extended:true}))

app.use(errorMiddleware)











app.post('/payment-checkout', verifyToken, async (req, res) => {

  const customer = await stripe.customers.create({

    metadata:{
   
      user_id:req.body.currentOrder.userId,
      cart:JSON.stringify(req.body.currentOrder.foodcart.foodItems),
      address:JSON.stringify(req.body.currentOrder.selectedAddress),
      selectedPaymentMethod:req.body.currentOrder.selectedPaymentMethod,
      totalAmount:4000,


    }

  })

  console.log(req.body.currentOrder, 'cirrent order')

  const session = await stripe.checkout.sessions.create({
    line_items:req.body.currentOrder.foodcart.foodItems.map(item => {
            
      return {

        price_data:{

         currency:'inr',
         product_data:{
             
           name:item.foodItemName
             
         },

         unit_amount:(item.foodItemPrice)*100

        },

        quantity:item.foodItemQuantity

    }

    }),

    mode: 'payment',

    customer:customer.id,

    success_url: 'http://localhost:3000/foodordersuccess',
    cancel_url: 'http://localhost:3000/cancel',
  
  });

  res.send({url:session, id:session.id});

});





let endpointSecret;



app.post('/webhook', express.raw({type:'application/json'}), async(req, res) => {
  
 /// endpointSecret= "whsec_5ad03d79959f75d1e18fff4275352c068332e9e0b4640f57209b2e67f1b4dcc4";
  
  console.log(req.body, 'req.body');

  //console.log(req.body.data.metadata, 'metadata');

  let sig = req.headers['stripe-signature'];
  
  
  let eventType;


  let data 
  
  if(endpointSecret){

    let event;
    
    try {
          event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
          
          console.log("webhook verified.")
          
      } catch (err) {
      
            console.log(err)
            
            res.status(400).send(`Webhook Error: ${err.message}`);
            
            return;

      }
    
      data = event.data.object
      
      eventType = event.body.type


}else{

  data = req.body.data.object

  eventType = req.body.type

}
      
      // Handle the event
 
      if(eventType === 'payment_intent.succeeded'){
 
        stripe.customers.retrieve(data.customer).then((customer) => {

             createdOrder(customer, data, res)
            
        });

      }
      

      res.send().end()
    

      // Return a 200 response to acknowledge receipt of the event

  })




  const createdOrder = async(customer, intent, res) =>{

     console.log("custoemr", customer.metadata.cart, 'customer')
    // console.log(intent, 'intent')
     //console.log(res, 'response')

    try{

   const order = await orderModel.create({

    customerId:customer.metadata.user_id,
    items:customer.metadata.cart,
    address:customer.metadata.address,
    paymentMethod:customer.metadata.selectedPaymentMethod,
    totalAmount:customer.metadata.totalAmount,

})

console.log(order ,"orderPlaced")


    }catch(err){
   
     console.log(err)

    }





  }






















/// below is for subscription appi 


app.post('/session',  verifyToken, async(req,res) =>{

    console.log(req.user.email, 'useruser')

  const user = await subscirbeUserPlanModel.findOne({email:req.user.email})

   const session = await stripe.checkout.sessions.create({

    mode:'subscription',
    payment_method_types:['card'],
    line_items:[{

    price:req.body.priceId,
    quantity:1

    }
    
  ],
  

  
  success_url:"http://localhost:3000/planpurchasesuccess",
  cancel_url:"http://localhost:3000/",
  
  customer:user.customerStripeId
  
},
{
  
  apiKey:process.env.STRIPE_SECRET
  
})

console.log(session)
 
   return res.json(session)

})




app.get("/getsubs", async(req, res) =>{


  const user = await UserModel.findOne({email:"shubhamkumarin2022@gmail.com"})


   const subscriptions = await stripe.subscriptions.list({

     customer:user.customerStripeId,
     
     status:"all",

     expand:["data.default_payment_method"]


},
   
{
   
   apiKey:process.env.STRIPE_SECRET
    
})


 console.log(subscriptions)

 res.json(subscriptions)

})









app.post("/verifyplanneduser", (req, res, next) =>{


  const token = req.cookies.zomato_planned_user_cookie

  if(!token) {

    return next(ErrorHandler(401,"unauthorised user please.... login first...."))
  
  }

   jwt.verify(token && req.body.token, process.env.ZOMATO_PLANNED_USER_SECRET_KEY, (err, user) =>{
 
   if(err) return next(ErrorHandler(401,'token not valid'))
 
   res.json("validToken")

   req.user = user
 
    next()

  })



})





app.get("/checkuserauth", (req, res, next) =>{


  const token = req.cookies.zomato_cookie

  if(!token) {

  
    return next(ErrorHandler(401,"unauthorised user please.... login first...."))
  
  
  }

   
  jwt.verify(token, process.env.SECRETKEY , (err, user) =>{
 
   
   
    if(err) return res.json({message:"inValidUser"})
 
   
   
   res.json({message:"validUser"})


   req.user = user
 

   next()


  })



})







/// advance mongodb practice api creating 


// comparsion operators in mongodb 

// logical operators in mongodb 



/// this also includes cursor methods like = count() limit() skip() sort()




app.get("/compare", async(req, res) =>{

try{

const response = await foodItemModel.aggregate([{$group:{_id:"$restaurantName", foodItems:{$min:"$foodItemPrice"}}}]);



///{$match:{restaurantName:"gareeb di hatti"}},{$group:{_id:"$foodItemPrice", completeDoc:{$sum:1}}}



   console.log(response)

   res.json(response)


}catch(err){

    console.log(err)

  }
    



})









{/*


app.get("/compare", async(req, res) =>{

try{

   const response = await foodItemModel.find({budget:{$exists:true}});

   console.log(response)

   res.json(response)


}catch(err){

    console.log(err)

  }
    



})


*/}












//mongodb operators logical 






// $and = and operator

// $and writing syntax = foodItemModel.find({$and:[{foodItemPrice:{$eq:799}}, {foodItemName:"butter naan"}]});






// $ne = not equals

// $ne writing syntax = foodItemModel.find({foodItemPrice:{$ne:req.body.number}});





// $not = not and not equals 

// $not writing syntax = foodItemModel.find({foodItemPrice:{$not:{$eq:req.body.number}}});






// $eq = equals to 

// $neq writing syntax = foodItemModel.find({foodItemPrice:{$eq:244}});








// $lt = lesser then

// $lt writing syntax = foodItemModel.find({foodItemPrice:{$lt:244}});






// $gt = greater then


// $gt writing syntax = foodItemModel.find({foodItemPrice:{$gt:244}});





// $gte = greater then equals to 


// $gte writing syntax = foodItemModel.find({foodItemPrice:{$gte:244}});





// $lte = lesseer then equals to 

// $lte writing syntax = foodItemModel.find({foodItemPrice:{$lte:244}});






// $nin = not in

// $nin writing syntax = foodItemModel.find({foodItemPrice:{$nin:[244, 233, 442,]}});





// $or = or operator 

// $or writing syntax = foodItemModel.find($or[{foodItemPrice:{$eq:244}}, {foodItemName:"butter naan"}]});





// $nor = nor operator

// $nor writing syntax = foodItemModel.find({$nor:[{foodItemPrice:{$eq:req.body.number}}, {foodItemName:"butter naan"}]});






/// mongodb evaluation operators


// $regex = $regex is used when making an
// api related to search purpose etc




// $expr = $expr operator is used when doing 
// comparison or something between two different fields












/// methods description



// count() method count = is used when we want length of an array 





/// using sort() method we can get
/// ascending and descending orders 






/// limit() method = helps to get a limited
// length of array 



























app.listen(4590, console.log(4590))






 