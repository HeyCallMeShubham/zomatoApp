

const errorMiddleware = (err, req, res, next) =>{

  err.message = err.message || "internal Server Error"

  err.statusCode = err.statusCode || 500




  // later uncomment if needed

  //if(err.code === 409){

  ///err.message = err.message || 'user already with this email'

 /// err.statusCode = 409

//}



res.status(err.statusCode).json({

    success:false,
    stack:"mongodb+srv://shubham:mylife@cluster0.natwega.mongodb.net/" === "production" ? null : err.stack,
    message:err.message

})

}



module.exports = errorMiddleware








