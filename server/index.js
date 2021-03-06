const express = require("express") ;
const app = express() ;
const cors = require("cors")



//mmiddle
app.use(express.json())
app.use(cors())

const db = require("./models")
//Router 
const postRouter = require("./routes/Posts.js")
const commentsRouter = require("./routes/Comments.js")
const likesRouter = require("./routes/Likes.js")
const userRouter = require("./routes/Users.js")
app.use("/posts", postRouter)
app.use("/comments" , commentsRouter)
app.use("/auth", userRouter)
app.use("/likes", likesRouter)

db.sequelize.sync().then(()=>{
    
app.listen(3003 , ()=>{
    console.log("web server run on port")
   
})


})