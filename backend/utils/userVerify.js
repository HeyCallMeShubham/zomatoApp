const jwt = require('jsonwebtoken')

const cookieParser = require("cookie-parser")
const ErrorHandler = require('./ErrorHandler')
const { tryCatch } = require('./tryCatch')

  const verifyToken = tryCatch(async(req, res, next) =>{

      const token = req.cookies.zomato_cookie

      if(!token) {
    
        return next(ErrorHandler(401,"unauthorised user please.... login first...."))
      
      }

       jwt.verify(token, process.env.SECRETKEY, (err, user) =>{
     
       if(err) return next(ErrorHandler(401,'token not valid'))
     
       req.user = user

       console.log(req.user)
     
        next()

      })

})





module.exports = verifyToken

