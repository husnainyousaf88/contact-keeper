const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const {check, validationResult} = require('express-validator');
const User = require('../models/User');
const config     = require('config');



router.get('/',auth, async (req, res) =>{
    try{
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('server error');
    }
});
//@route    POST api/user
//@desc     Register a user
//@access   public 

router.post('/',[
    check('name', 'Please add a name')
    .not().isEmpty(),

    check('email', 'please add a valid email address').isEmail(),
    check('password', 'please enter a password with 6 or more characters')
    .isLength({min:6})
],
async (req, res)=> {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({erros: errors.array()});
    }
    const {name, email, password} =     req.body;
    try {
        let user = await User.findOne({ email});
        if (user)
            return res.status(400).json({msg: "User already exist"});

        user = new User({name, email, password });
        
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password,salt);
        await user.save();
        console.log("user saved");


        const payload = {
            user: { id: user.id }
                };
        
        jwt.sign(payload,
                config.get('jwtSecret'),
                {expiresIn: 36000},
                 (err, token) => {
                     if (err)
                     { throw err;}
                     res.send({token});
        });

    } 
    catch(err) {
        console.error(err.message);
        res.status(500).send('server error');

    }

});
module.exports = router;