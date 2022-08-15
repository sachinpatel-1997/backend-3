// const  from "express-async-handler";
const asyncHandler = require('express-async-handler');
// import User from "../models/user.model";
let User = require('../models/user.model');
let mongoose = require('mongoose');
    // const user = await User.findById(req.user.id);
  
    const updateUserProfile = asyncHandler(async (req, res) => {
      const url = req.protocol + '://' + req.get('host')
      // let user = await User.findById(req.user._id);
      const user = new User({
        
        _id: new mongoose.Types.ObjectId(),
         name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        imgCollection: url + 'C:\node-express-boilerplate\public' + req.file.filename
    });
      if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.pic = req.body.pic || user.pic;
        if (req.body.password) {
          user.password = req.body.password;
        }
    
        const updatedUser = await user.save();
    
        res.json({
          _id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          pic: updatedUser.pic,
          isAdmin: updatedUser.isAdmin,
          token: generateToken(updatedUser._id),
        });
      } else {
        res.status(404);
        throw new Error("User Not Found");
      }
    });
    
   
  
  module.exports = {
    updateUserProfile
  };
  