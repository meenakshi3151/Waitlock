const express=require('express');
const router=express.Router();
const {goingOutt,comingIn}=require('../controllers/entryController');
router.put('/goingOut',goingOutt);
router.put('/comingIn',comingIn)
module.exports=router;