const express = require("express") ;
const router = express.Router() ;
const {Users} = require("../models") ; 

router.get("/" , (req,res)=>{
    res.json({message : "this is ready "})
})

module.exports = router;

