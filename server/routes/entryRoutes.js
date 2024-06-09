const express=require('express');
const router=express.Router();
const {goingOutt,comingIn,getAllStudentsIn,getAllStudentsOut,getAllStudentsLate}=require('../controllers/entryController');
router.put('/goingOut',goingOutt);
router.put('/comingIn',comingIn)
router.get('/getAllStudentsIn',getAllStudentsIn);
router.get('/getAllStudentsOut',getAllStudentsOut);
router.get('/getAllStudentsLate',getAllStudentsLate);
module.exports=router;