const router = require('express').Router();
const user = require('../database-connection').user;
const jwt = require('jsonwebtoken');
const saltRounds = 10;

router.post('/signup',async (req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    const emailId = req.body.emailId;

    if(!username|| !password||!emailId){
        res.send({
            success: false,
            error: "fields can't be empty" 
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
            error: null
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
            let token = jwt.sign(user.toJSON(), 'very very secret',{expiresIn: '30m'});
            res.json({success: true, token: 'JWT ' + token});
        }
        else{
            res.json({success: true, messagee: 'Invalid Password'});
        }
    }).catch((err)=>{
        res.send({success: false, message: 'Inavlid Credentials'});
    })
})

module.exports = router;