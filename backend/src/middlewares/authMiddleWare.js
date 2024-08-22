const jwt = require('jsonwebtoken');
const {JWT_SECRET, JWT_SECRET_REFRESH} = require('../../config/index');
const User = require('../models/user-Model');





const authenticated = (req, res, next) => {

  const refreshToken = req.cookies.refreshToken;

 
  


  if (refreshToken) {
    jwt.verify(refreshToken, JWT_SECRET_REFRESH, (err, decoded) => {
      if (err) {
        console.error('Token verification error:', err); // Log the error for debugging
        return res.status(401).json({ message: `Token bad: ${err.message}` });
      } else {
        req.decoded = decoded; // Attach decoded user info to the request object
        next(); // Proceed to the next middleware or route handler
      }
    });
  } else {
    return res.status(401).json({ message: 'Token not found' });
  }
};


const refreshTokenMiddleware = (req, res, next) => {
  const { refreshToken } = req.body; // Assuming refresh token is sent in the request body

  if (refreshToken) {
    jwt.verify(refreshToken, JWT_SECRET, (err, decoded) => {
      if (err) {
        console.error('Refresh token verification error:', err); // Log the error for debugging
        return res.status(401).json({ message: `Refresh token invalid: ${err.message}` });
      } else {
        req.decoded = decoded;
        next(); // Only call next() if the refresh token is successfully verified
      }
    });
  } else {
    return res.status(401).json({ message: 'Refresh token not found' });
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
  refreshTokenMiddleware
 
}