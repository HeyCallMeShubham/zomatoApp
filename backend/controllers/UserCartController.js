
const mongoose = require("mongoose");
const UserCartModel = require("../models/userCartModel");


const addToCart = async(req, res) =>{

    console.log(req.user)

try{

    const addeddProduct = await UserCartModel.create({...req.body})

    if(!addeddProduct) return res.status(501).jaon({message:"couldnt add to cart", success:false})


    res.status(201).json({message:'item added to cart', success:true})

}catch(err){

   console.log(err)

}


}




const fetchFromCart = async(req, res) =>{

try{

    const userCartItems = await UserCartModel.find({userId:req.body.userId})

    if(!userCartItems) return res.status(501).json({message:"couldnt couldnt fetch from cart"})
      
    console.log(userCartItems)

    res.status(201).json({message:'item added to cart', userItems:userCartItems})

}catch(err){

   console.log(err)

}


}






module.exports = {
     
addToCart,
fetchFromCart


}

















