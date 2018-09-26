const router = require('express').Router();


router.post('/signin',(req,res)=>{
    return JSON.stringify({
        username: req.body.username,
        password: req.body.password,
        emailId: req.body.emailId
    })
})

module.exports = router;