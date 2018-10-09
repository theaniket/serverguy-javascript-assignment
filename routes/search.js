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

  router.post('/add', async (req,res,next)=>{
    passport.authenticate('jwt', {session: false},async (err, user, info) => {
        let token = getToken(req.headers);
    // let authorization = req.headers.authorization;
    // let decode;
    // decode = jwt.verify(authorization,token).then((user)=>{
    //         console.log(user);
    // });
    // console.log(decode);
    if(token){
        let item = await search.findOne({
            where:{
                text: req.body.text
            }
        }).catch((err)=>{
            res.send({success: false, message: 'Server Error'});
    });
    
        if(item){
            item.dataValues.createdOn = Date.now();
            item.save();
            return res.send({success: true, message: 'Item Already present', item: item});
        }else{
            let  newSearchItem =  await search.build({
                text: req.body.text,
                userId: user.dataValues.id,
                createdOn: Date.now()
            }).save().catch((err)=>{
                res.send({success: false, message: 'Server Error'});
            })
    
            res.send({success: true, message: 'New Search Added', item: newSearchItem});
        }
    }else{
        res.send({success: false, message: 'Unauthorized'});
    }
    })(req, res);
    
})

router.get('/recent/:itemsCount', async (req,res,next)=>{
    passport.authenticate('jwt', {session: false},async (err, user, info) => {
        let token = getToken(req.headers);
    // let authorization = req.headers.authorization;
    // let decode;
    // decode = jwt.verify(authorization,token).then((user)=>{
    //         console.log(user);
    // });
    // console.log(decode);
    if(token){
        const itemsCount = req.params.itemsCount;
        await search.findAll({
            limit: itemsCount,
            order:[
                ['createdOn', 'DESC']
            ],
            where:{
                userId: user.dataValues.id
            }
        }).then((items)=>{
            res.send({success: true, items: items});
        }).catch((err)=>{
            res.send({success: false, message: "Internal Server Error"});
        });
    }else{
        res.send({success: false, message: 'Unauthorized'});
    }
    })(req, res);
    
})


module.exports = router;