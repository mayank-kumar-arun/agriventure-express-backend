const {Officer, Producer} = require('../models/producer');
const express = require('express');
const {User} = require("../models/user");
const router = express.Router();

router.get('/',async (req, res) => {
    const officerList = await Officer.find().populate('location').populate('login');
    if(!officerList){
        res.status(500).json({success: false});
    }
    res.send(officerList);
});

router.post(`/`,async (req,res)=>{

    const login = await User.findById(req.body.login);
    if(!login){
        return res.status(400).send('Invalid user')
    }

    let officer = new Officer({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        nic: req.body.nic,
        email: req.body.email,
        telNum: req.body.telNum,
        login: req.body.login,
        location: req.body.location,
        officerType: req.body.officerType
    });

    officer = await officer.save();
    if(!officer){
        return res.status(500).json({
            success: false
        });
    }
    res.send({
        officer: officer,
        success: true
    });

});

router.put('/updateProfile',async (req,res)=>{

    const officer = await Officer.findByIdAndUpdate(
        req.body.id,
        {
            email: req.body.email,
            telNum: req.body.telNum,
            location: req.body.location,

        },{new: true})
    if(!officer){
        return res.status(404).send({message: 'The officer can not be updated', success: false});
    }
    res.send({
        success: true,
        officer: officer
    });
});

module.exports = router;