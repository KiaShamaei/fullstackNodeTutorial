const express = require("express");

const router = express.Router();
const { Posts , Likes } = require("../models");
const {validToken} =require('../middlewares/AuthMiddleware')


router.get("/",validToken , async (req, res) => {
  const listOfPosts = await Posts.findAll({include:[Likes]});
  const postLikes = await Likes.findAll({where : {UserId : req.user.id}})
  res.json({listOfPosts: listOfPosts , postLikes : postLikes});
});

router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;
  // const post = await Posts.findByPk(id);
  const post = await Posts.findOne({where : {id : id}})
  res.json(post);

});

router.post("/",validToken ,async (req, res) => {
  const post = req.body;
  post.UserId = req.user.id ;
  post.username = req.user.username ;
  try{
    await Posts.create(post);
  }catch{
    throw Error
  }
  res.json(post);
});

module.exports = router;