
const mongoose = require("mongoose")

const { userOrderModel } = require("../models/userOrdersModel")





const placeOrder = async(req, res) =>{

   console.log(req.body.data)

   try{

      const UserOrder = await userOrderModel.create({

         items:req.body.data.items,
         address:req.body.data.address,
         paymentMethod:req.body.data.selectedPaymentMethod,
         orderBy:req.body.data.userId
   
   
     })
   
// console.log(UserOrder)


   }catch(err){

      console.log(err)

   }


}
 



module.exports = {

    placeOrder
 

}













