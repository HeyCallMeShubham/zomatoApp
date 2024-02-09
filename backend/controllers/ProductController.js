
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const productModel = require("../models/ProductModel");
const { tryCatch } = require("../utils/tryCatch");
const ErrorHandler = require("../utils/ErrorHandler");


const addProducts = async(req, res) =>{

    try{


   const createdproduct = await productModel.create({...req.body}) 

   if(!createdproduct){

     res.status(400).json({message:"couldn't create product", })

   }

   res.status(201).json({message:"product added successfully"})


    }catch(err){

    console.log(err)

    }


}




const deleteProducts = async(req, res) =>{

  console.log(req.body)

    try{


   const updatedproduct = await productModel.findByIdAndDelete({_id:req.body._id}) 

   if(!updatedproduct){

    /// res.status(400).json({message:"couldn't delete product", })

   }

   res.status(201).json({message:"product deleted successfully"})


    }catch(err){

    console.log(err)

    }


}




const getproducts = tryCatch(async(req, res, next) =>{


    const search = req.query.search || ''

    const page = req.query.page || ''

    const ITEM_PER_PAGE= 2

      const query = {
      
        title:{$regex:search, $options:'i'}

      }

//

      const skip = (page - 1) * ITEM_PER_PAGE
      
      const count = await productModel.countDocuments(query)


   const getproducts = await productModel.find(query)
   .limit(ITEM_PER_PAGE)
   .skip(skip) 

   if(!getproducts){

    next(ErrorHandler(400, "sorry could'nt fetch items" ))


   }

 
   
   res.status(201).json({message:"product fetched successfully", products:getproducts})

//

})



const findoneproduct = async(req, res) =>{
 
      try{
 
     const getproduct = await productModel.findOne({_id:req.params.id})
 

     if(!getproduct) return res.status(400).json({message:"couldn't fetch products", })
  
     
     return res.status(201).json({message:"product fetched successfully", products:getproduct})
  
  
      }catch(err){
  
      console.log(err)
  
      }
  
  
  }
  
  























const getPaginatedProducts = async(req, res) =>{

//console.log(req.query)
 

    try{


   const all = await productModel.find(query) 
 

    }catch(err){

    console.log(err)

    }


}






const searchProductsPage = async(req, res) =>{

  console.log(req.query,'no problem')
  
  
      const search = req.query.search || ''
 
        const query = {
        
          title:{$regex:search, $options:'i'}
  
        }
  
      try{
  
     const searchedProducts = await productModel.find(query)
 
     if(!getproducts){
  
       res.status(400).json({message:"couldn't fetch products", })
  
     }

     console.log(searchedProducts, 'searched products')
  
     
     res.status(201).json({message:"product fetched successfully", products:searchedProducts})
  
  
      }catch(err){
  
      console.log(err)
  
      }
  
  
  }
  
  




module.exports = {
     
    addProducts,
    getproducts,
    getPaginatedProducts,
    searchProductsPage,
    findoneproduct,
    deleteProducts


}







