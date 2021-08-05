const express = require("express") ;
const app = express() ;
const db = require("./models")
db.sequelize.sync().then(()=>{
    
app.listen(3001 , ()=>{
    console.log("web server run on port")
   
})

app.get("/" , (req,res)=>{
    res.send("hello world")
}).catch((e)=>{
    console.log(e)
})
})