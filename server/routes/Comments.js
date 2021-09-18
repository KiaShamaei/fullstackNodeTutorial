const { json } = require("body-parser");
const express = require ("express") ;
const router  = express.Router() ;
const { Comments } = require("../models");


router.get("/" , async (req, res)=>{
    const listComments = await Comments.findAll();
    res.json(listComments)

})
router.get("/:postId" , async (req , res)=>{
    const postId = req.params.postId ;
    const comments =await Comments.findAll({where : {PostId : postId}}) ;
    res.json(comments)
})

router.post ("/" , async(req, res)=>{
    const comment = req.body ; 
    try{
        await Comments.create(comment)
    }catch{
        throw Error("this is wrong id")
    }
    res.json(comment)
} )



module.exports= router ;