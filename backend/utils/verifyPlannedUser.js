const jwt = require('jsonwebtoken')

const cookieParser = require("cookie-parser")
const ErrorHandler = require('./ErrorHandler')
const { tryCatch } = require('./tryCatch')

  const verifyPlannedUser = tryCatch(async(req, res, next) =>{

      const token = req.cookies.zomato_planned_user_cookie

      console.log(token)

      if(!token) {
    
        return next(ErrorHandler(401,"unauthorised user please.... login first...."))
      
      }

       jwt.verify(token, process.env.ZOMATO_PLANNED_USER_SECRET_KEY, (err, user) =>{
     

       if(err) return next(ErrorHandler(401,'planned token not valid'))
     

       req.user = user
     

       next()


      })

})






module.exports = verifyPlannedUser







