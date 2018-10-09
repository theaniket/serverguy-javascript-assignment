const router = require('express').Router();
const user = require('../database-connection').user;
const jwt = require('jsonwebtoken');
const saltRounds = 10;
const secret = require('../config').secret;

router.post('/signup',async (req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    const emailId = req.body.emailId;

    if(!username|| !password||!emailId){
        res.send({
            success: false,
            message: "fields can't be empty" 
        })
    }

    else{
        const newUser = await user.build({
            username: username,
            password: password,
            emailId: emailId
        }).save();
        console.log(newUser.dataValues.id);
        res.send({
            success: true,
            message: 'Please Log In!'
        })
    }
})

router.post('/signin', async (req,res)=>{
    const x = await user.findOne({
        where:{
            username: req.body.username
        }
    }).then((user)=>{
        if(user.password == req.body.password){
            let token = jwt.sign(user.toJSON(),secret,{expiresIn: '30m'});
            res.json({success: true, token: 'JWT ' + token});
        }
        else{
            res.json({success: false, messagee: 'Invalid Password'});
        }
    }).catch((err)=>{
        res.send({success: false, message: 'Inavlid Credentials'});
    })
})

module.exports = router;