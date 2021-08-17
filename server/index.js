const express = require("express") ;
const app = express() ;
const cors = require("cors")

const db = require("./models")

//mmiddle
app.use(express.json())
app.use(cors())


//Router 
const postRouter = require("./routes/Posts.js")
app.use("/posts", postRouter)

db.sequelize.sync().then(()=>{
    
app.listen(3003 , ()=>{
    console.log("web server run on port")
   
})


})