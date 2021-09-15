const express = require("express");

const router = express.Router();
const { Posts } = require("../models");

router.get("/", async (req, res) => {
  const listOfPosts = await Posts.findAll();
  res.json(listOfPosts);
});

router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;
  // const post = await Posts.findByPk(id);
  const post = await Posts.findOne({where : {id : id}})
  res.json(post);

});

router.post("/", async (req, res) => {
  const post = req.body;
  try{
    await Posts.create(post);
  }catch{
    throw Error
  }
  res.json(post);
});

module.exports = router;