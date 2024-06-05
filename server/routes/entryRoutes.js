const express=require('express');
const router=express.Router();
const {goingOut,comingBack}=require('../controllers/entryController');
router.put('/goingOut',goingOut);
router.put('/comingBack',comingBack);
module.exports=router;