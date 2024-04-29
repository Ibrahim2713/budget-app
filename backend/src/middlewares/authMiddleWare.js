const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../../config/index');
const User = require('../models/user-Model');

module.exports = {
    restricted,
    checkEmailExists,
    checkPasswordLength,
   
}


const restricted = (req,res,next) => {
    const token = req.headers.authorization;
    if(token){
        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if(err) {
                res.status(401).json({message: `token bad ${err.message}`})
           
              } else {
      
                req.decoded = decoded
           
         
              }
        })
        next()
    }

 else {
   res.status(401).json({message: 'json token is not found' })


}
}


  function checkPasswordLength(req,res,next) {
    if(!req.body.password || req.body.password.length < 8) {
      res.status(422).json({ message: "Password must be longer than 8 chars"})
    } else {
      next()
    }
  }

   async function checkEmailExists(req,res,next) {
      try {
        const possible = await User.findBy({email:req.body.email})
        if(possible.length) {
          res.status(401).json({message: "This account exists already"})
        } else {
         next()
        }
      } 
      catch(err) {
        next(err)
      }
  }