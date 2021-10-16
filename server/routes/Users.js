const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const {sign} = require("jsonwebtoken");
const {validToken} = require("../middlewares/AuthMiddleware")

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    Users.create({
      username: username,
      password: hash,
    });
    res.json("SUCCESS");
  });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await Users.findOne({ where: { username: username } });

  if (!user) res.json({ error: "User Doesn't Exist" });

  bcrypt.compare(password, user.password).then((match) => {
    if (!match) res.json({ error: "Wrong Username And Password Combination" });
	const accesstoken = sign({username :  user.username , id : user.id} , "secret")
    res.json({username : user.username ,id: user.id , token :accesstoken});
  });
});
router.get("/auth" ,validToken , (req, res)=>{
	res.json(req.user)
} )
router.get("/basicInfo/:id" , async(req,res)=>{
	const id = req.params.id ;
	const basicInfo = await Users.findByPk(id, {attributes:{
		exclude:["password"]
	}})
	res.json(basicInfo)
})
router.put("/changepassword", validToken , async (req,res)=>{
	const {newpassword , oldpassword} = req.body ;
	const user = await Users.findOne({where : {username : req.user.username}})
	bcrypt.compare(oldpassword, user.password).then(async (match) => {
		if (!match) res.json({ error: "Wrong password !" });
		bcrypt.hash(newpassword, 10).then(async(hash) => {
			await Users.update({
			  password: hash,
			} , {
				where :{
					username : req.user.username
				}
			});
			res.json("SUCCESS");
		  });
		
	  });
})

module.exports = router;