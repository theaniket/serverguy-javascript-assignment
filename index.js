const express = require('express');
const db = require('./database-connection');
let app = express();
const PORT = process.env.PORT || 3000;

db.sync()
.then(()=>{
    console.log("Connection Succesful");
}).catch((err)=>{
    console.log(`Error occurred : ${err}`);
})

app.listen(PORT,()=>{
    console.log(`Listening on port:  ${PORT}`);
})