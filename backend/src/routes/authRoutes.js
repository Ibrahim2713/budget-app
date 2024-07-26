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
            // adjust to && after testing routes
            if(user || bcrypt.compareSync(password, user.password)) {
                const token = buildToken(user)
                console.log(token)
                res.status(200).json({user,token})
               
                
            } else {
    
                res.status(401).json({message: 'Invalid Credentials'})
            }
        }) 
        .catch(next)
})



router.get('/', md.authenticated, async (req, res) => {
    try {
        const userId = req.decoded.subject;
        const month = parseInt(req.query.month, 10); 
        const year = parseInt(req.query.year, 10); 

       
        const userData = await User.getUserData(userId, month, year);

        if (userData.length > 0) { 
            res.status(200).json(userData);
        } else {
            res.status(404).json({ message: 'User data not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});





function buildToken(user) {
    const payload = {
        subject: user.id,
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