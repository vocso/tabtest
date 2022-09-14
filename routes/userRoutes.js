const express=require("express");
const router=express.Router();
const userController=require("../controllers/userController")
const verify =require("./verifyTokens");


//router.post("/",userController.showDefault);


router.post("/registerMobile",userController.registerMobile);
router.post("/verifyMobileOTP",userController.verifyMobileOTP);

// get current user's profile
router.get("/",userController.getCurrentUser);

//Secure Routes

router.get("/list/",verify, userController.list);
router.get("/listProfiles/",verify, userController.listProfiles);
//router.get("/list/:createdAt",verify, userController.list);


router.get("/:_id",verify, userController.getUser);
router.post("/updatePersonalInfo",verify, userController.updatePersonalInfo);
router.post("/updateHandle",verify, userController.updateHandle);




//router.post("/updateProfessionalInfo",verify, userController.updateProfessionalInfo);
// router.post("/updatePhoto",userController.updatePhoto);
// router.post("/updateSchedule",userController.updateSchedule);
// router.post("/updateRates",userController.updateRates);
// router.post("/rateUser",userController.rateUser);


module.exports=router;