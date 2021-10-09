const { json } = require("body-parser");
const express = require ("express") ;
const { Likes } = require("../models");
const router = express.Router();
const {validToken} =require('../middlewares/AuthMiddleware')



router.post("/" , validToken ,async (req, res)=>{
const {PostId} = req.body ; 
const UserId = req.user.id ;
const foundLike =await Likes.findOne({where : {
	PostId : PostId , UserId:UserId
}})
if (!foundLike){
try{
await	Likes.create({PostId : PostId , UserId:UserId})

}catch(e){
	res.json(e)
}
res.json({like :  true})
}else{
	await Likes.destroy({where : {
		PostId : PostId , UserId:UserId
	}})
res.json({like : false})

}

} )
module.exports = router;
