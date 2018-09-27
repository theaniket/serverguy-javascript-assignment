const router = require('express').Router();
const passport = require('passport');
const jwt = require('passport-jwt');
require('../passport')(passport);
const search = require('../database-connection').search;

let getToken = function (headers) {
    if (headers && headers.authorization) {
      var parted = headers.authorization.split(' ');
      if (parted.length === 2) {
        return parted[1];
      } else {
        return null;
      }
    } else {
      return null;
    }
  };

let userId;

router.post('/github', async (req,res,next)=>{
    passport.authenticate('jwt', {session: false},async (err, user, info) => {
        let token = getToken(req.headers);
    // let authorization = req.headers.authorization;
    // let decode;
    // decode = jwt.verify(authorization,token).then((user)=>{
    //         console.log(user);
    // });
    // console.log(decode);
    if(token){
        let  newSearchItem =  await search.build({
            text: req.body.text,
            userId: user.dataValues.id,
            createdOn: Date.now()
        }).save().catch((err)=>{
            res.send({success: false, message: 'Server Error'});
        })

        res.send({success: true, message: 'Item Added!'});
    }else{
        res.send({success: false, message: 'Unauthorized'});
    }
    })(req, res);
    
})

// router.get('/recentfive', passport.authenticate('jwt',{session:false}), async (req,res)=>{
//     passport.authenticate('jwt', {session: false},async (err, user, info) => {
//         let token = getToken(req.headers);
//     // let authorization = req.headers.authorization;
//     // let decode;
//     // decode = jwt.verify(authorization,token).then((user)=>{
//     //         console.log(user);
//     // });
//     // console.log(decode);
//     if(token){
//         let items = [];
//         await search.findAll({
//             where:{
//                 userId: user.dataValues.id
//             },
//             limit:5
            
//         }).then((result)=>{
//             console.log(result);
//             items = result;
//         }).catch((err)=>{
//             res.send({success: false, message: 'Server Error'});
//         })

//         res.send({success: true, items: items});
//     }else{
//         res.send({success: false, message: 'Unauthorized'});
//     }
//     })(req, res);
// })

module.exports = router;