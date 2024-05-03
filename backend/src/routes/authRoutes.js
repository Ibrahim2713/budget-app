const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user-Model');
const md = require('../middlewares/authMiddleWare')
const {JWT_SECRET, BCRYPT_ROUNDS}  = require('../../config/index')


//route to get make account 
router.post('/register', md.checkEmailExists, md.checkPasswordLength, async (req,res,next) => {
    let user = req.body;

    const hash = bcrypt.hashSync(user.password, BCRYPT_ROUNDS);
    user.password = hash;
    try {
        const createdUser = await User.addUser(user);
        res.json(createdUser);
    }
    catch(err){
         next(err)  
    }
})


//route to login into account
router.post('/login', (req,res,next) => {
    let {email, password} = req.body;
   
    User.findBy({email})
        .then(([user]) => {
            console.log(user)
            if(user && bcrypt.compareSync(password, user.password)) {
                const token = buildToken(user)
                res.status(200).json({user,token})
               
                
            } else {
    
                res.status(401).json({message: 'Invalid Credentials'})
            }
        }) 
        .catch(next)
})






function buildToken(user) {
    const payload = {
        subject: user.user_id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email
    }
    const options = {
        expiresIn: '1d'
    }

    return jwt.sign(payload, JWT_SECRET, options)
}










module.exports = router