const express = require('express');
const db = require('./database-connection');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const passport = require('passport');
const jwt = require('jsonwebtoken');
let app = express();
const PORT = process.env.PORT || 3000;

const userRouter = require('./routes/user');
const searchRouter = require('./routes/search')
require('./passport')(passport);



app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/user',userRouter);
app.use('/search',searchRouter);
passport.serializeUser(function(userId,done){
    done(null,userId);
});

passport.deserializeUser(function(userId,done){
    done(null, userId);
})

db.sequelize.sync()
.then(()=>{
    console.log("Connection Succesful");
}).catch((err)=>{
    console.log(`Error occurred : ${err}`);
})

app.listen(PORT,()=>{
    console.log(`Listening on port:  ${PORT}`);
})