const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user-Model');
const md = require('../middlewares/authMiddleWare')
const {JWT_SECRET, JWT_SECRET_REFRESH, BCRYPT_ROUNDS}  = require('../../config/index')









router.get('/', md.authenticated, async (req,res,next) => {
    const userId = req.decoded.subject;
    const userData = await User.getUserById(userId);
    res.status(200).json(userData);
})
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


router.post('/login', (req, res, next) => {
    let { email, password } = req.body;

    User.findBy({ email })
        .then(([user]) => {
            if (user && bcrypt.compareSync(password, user.password)) {
                const { accessToken, refreshToken } = buildTokens(user);
              
                   
                res.cookie('refreshToken', refreshToken, {
                    httpOnly: true, // Prevents JavaScript from accessing the cookie
                    secure: false,  // Set to true in production if using HTTPS
                    sameSite: 'Lax', // Helps with CSRF protection
                    path: '/', // Cookie is accessible in all routes
                  });

                res.status(200).json({ user, accessToken });
            } else {
                res.status(401).json({ message: 'Invalid Credentials' });
            }
        })
        .catch(next);
});

router.post('/refresh', (req, res, next) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.status(403).json({ message: 'Refresh token missing' });
    }

    jwt.verify(refreshToken, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid refresh token' });
        }

        User.getUserById(decoded.subject)
            .then(user => {
                if (!user) {
                    return res.status(403).json({ message: 'User not found' });
                }

                const { accessToken, refreshToken: newRefreshToken } = buildTokens(user);

                // Send new refresh token in the cookie
                res.cookie('refreshToken', newRefreshToken, { httpOnly: true });

                res.status(200).json({ accessToken });
            })
            .catch(next);
    });
});

router.post('/logout', (req, res) => {
    res.clearCookie('refreshToken'); // Clear the refresh token cookie
    res.status(204).end(); // Send a 204 No Content response
});






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





function buildTokens(user) {
    const payload = {
        subject: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
    };


    const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: '15m' });
   


    const refreshToken = jwt.sign({ subject: user.id }, JWT_SECRET_REFRESH, { expiresIn: '7d' });


    return { accessToken, refreshToken };
}











module.exports = router