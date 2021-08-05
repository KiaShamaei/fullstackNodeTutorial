const express = require("express") ;
const app = express() ;
const db = require("./models")

//Router 
const postRouter = require("./routes/Posts.js")
app.use("/posts", postRouter)

db.sequelize.sync().then(()=>{
    
app.listen(3001 , ()=>{
    console.log("web server run on port")
   
})


})