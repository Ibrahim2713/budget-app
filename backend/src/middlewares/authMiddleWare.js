const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../../config/index');
const User = require('../models/user-Model');



const authenticated = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
      const token = authHeader.split(' ')[1]; // Extract the token from the "Bearer <token>" format
      jwt.verify(token, JWT_SECRET, (err, decoded) => {
          if (err) {
              console.error('Token verification error:', err); // Log the error for debugging
              return res.status(401).json({ message: `Token bad: ${err.message}` });
          } else {
              req.decoded = decoded;
              next(); // Only call next() if the token is successfully verified
          }
      });
  } else {
      return res.status(401).json({ message: 'Token not found' });
  }
};




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




module.exports = {
  authenticated,
  checkEmailExists,
  checkPasswordLength,
 
}