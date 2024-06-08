const express=require('express');
const router=express.Router();
const {goingOut}=require('../controllers/entryController');
router.put('/goingOut',goingOut);
module.exports=router;