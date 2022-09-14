const express=require("express");
const router=express.Router();
const callController=require("../controllers/callController")
const verify=require("../routes/verifyTokens");

router.post("/",verify,callController.showDefault);

module.exports=router;