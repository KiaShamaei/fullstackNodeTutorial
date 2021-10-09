const { json } = require("body-parser");
const express = require ("express") ;
const router  = express.Router() ;
const { Comments } = require("../models");
const {validToken} =require('../middlewares/AuthMiddleware')

router.get("/" , async (req, res)=>{
    const listComments = await Comments.findAll();
    res.json(listComments)

})
router.get("/:postId" , async (req , res)=>{
    const postId = req.params.postId ;
    const comments =await Comments.findAll({where : {PostId : postId}}) ;
    res.json(comments)
})

router.post ("/" ,validToken ,async(req, res)=>{
    const comment = req.body ; 
	const username = req.user.username ;
	comment.username = username ;
    try{
        await Comments.create(comment)
    }catch{
        throw Error("this is wrong id")
    }
    res.json(comment)
} )
router.delete("/:commentId" , validToken , async (req, res)=>{
const commentId = req.params.commentId ; 
	await Comments.destroy({where : {id : commentId}})
	res.json(true)
})



module.exports= router ;