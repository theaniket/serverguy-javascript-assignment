const express = require('express');
const db = require('./database-connection');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
let app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

db.sequelize.sync()
.then(()=>{
    console.log("Connection Succesful");
}).catch((err)=>{
    console.log(`Error occurred : ${err}`);
})

app.listen(PORT,()=>{
    console.log(`Listening on port:  ${PORT}`);
})