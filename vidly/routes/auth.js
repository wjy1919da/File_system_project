const _ = require('lodash');
const bcrypt = require('bcrypt');
const {User, validateUser,validateLogin} = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.post('/login', async (req, res) => {
  const { error } = validateLogin(req.body); // 使用 validateLogin 而不是 validateUser
  if (error) return res.status(400).send(error.details[0].message);

  var user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('User not existed.');

  let validatePassword = await bcrypt.compare(req.body.password, user.password);
  if (!validatePassword) {
      return res.status(400).send('Invalid email or password.');
  }

  const token = user.generateAuthToken();
  res.send(token);
});

router.post('/register', async (req, res) => {
  console.log("register req.body", req.body);

  // 验证请求体
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // 检查用户是否已经存在
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('User already registered.');

  // 创建新用户
  user = new User({
      email: req.body.email,
      password: req.body.password,
      isAdmin: req.body.isAdmin === true, // 如果请求中明确指定了 isAdmin 为 true，则设置为管理员
      username: req.body.username // 添加 username 字段
  });

  // 加密密码
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  // 保存用户
  await user.save();

  // 发送响应
  res.send({ 
      _id: user._id, 
      email: user.email, 
      isAdmin: user.isAdmin,
      username: user.username // 返回 username
  });
});

module.exports = router;