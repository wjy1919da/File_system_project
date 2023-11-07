const _ = require('lodash');
const bcrypt = require('bcrypt');
const {User, validateUser} = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  const {error} = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  var user = await User.findOne({email:req.body.email});
  if(!user) return res.status(400).send('User not existed.');
  //console.log("user",user,"req.body",req.body.password);
  let validatePassword = await bcrypt.compare(req.body.password, user.password);
  if(!validatePassword){
    return res.status(400).send('Invalid email or password.');
  }
  const token = user.generateAuthToken();
  res.send(token);
});
module.exports = router;