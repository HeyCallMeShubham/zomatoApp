const mongoose = require("mongoose");


 
 const connectDB = async() =>{

   try{

    const {connection} = await mongoose.connect("mongodb+srv://shubham:mylife@cluster0.natwega.mongodb.net/")

    console.log(`connectedd with ${connection.host}`)

   }catch(err){

    console.log(err)

   }


}


module.exports = connectDB
