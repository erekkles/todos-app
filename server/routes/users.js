const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authentication = require('../middleware/authentication');
const User = require('../models/User');

// SIGNUP HANDLER
router.post('/signup', async (req, res) => {
    
    const { username, password } = req.body;

    if (!username || !password) return res.status(400).end();

    const userTaken = await User.findOne({ username: username }).exec();

    if(userTaken) return res.status(409).send();
    
    try {

        bcrypt.hash(password, 10, async (err, hash) => {

            if(err || !hash) return res.status(400).end();

            const user = new User({
                username, 
                password: hash
            })

            await user.save();
            res.status(200).send();
        });

    } catch (error) {
        console.error(`ERROR: ${error}`);
        res.status(500).end();
    }

})

// LOGIN HANDLER
router.post('/login', async (req, res) => {
    
    const { username, password } = req.body;
    
    if(!username || !password) return res.status(400).send();
    
    // do a strip tag here for security purposes

    try {
        
        const user = await User.findOne({ username: username }).exec();
        
        if(user) {
            bcrypt.compare(password, user.password, async (err, result) => {

                if(err || !result) return res.status(400).send();
                
                const payload = { username, password };
                const jwt_token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "10m"});

                res.setHeader('Authorization', `Bearer ${jwt_token}`)
                res.setHeader('Access-Control-Allow-Origin', `http://localhost:3000`)
                res.status(200).send();
            });
        } else {
            res.status(400).send();
        }


    } catch (error) {
        console.error(`ERROR: ${error}`);
        res.status(500).send();
    }

});

router.post('/isauth', authentication, async (req, res) => res.status(200).send());

module.exports = router;