const Joi = require('joi');
const config = require('config');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
  },
  password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
  },
  isAdmin: Boolean,
  username: {
        type: String,
        required: true, // 确保 username 不为空
        minlength: 1,  // 可以根据需要设置最小长度
        maxlength: 255 // 可以根据需要设置最大长度
  }
});

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id:this._id, isAdmin: this.isAdmin},config.get('jwtPrivateKey'));
    return token;
}
const User = mongoose.model('User',userSchema);
function validateUser(user) {
  const schema = {
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
    isAdmin: Joi.boolean(),
    username: Joi.string().min(1).max(255).required() // 添加此行来验证 username 字段
  };
  return Joi.validate(user, schema);
}
function validateLogin(req) {
  const schema = {
      email: Joi.string().min(5).max(255).required().email(),
      password: Joi.string().min(5).max(255).required(),
      isAdmin: Joi.boolean(),
  };
  return Joi.validate(req, schema);
}
exports.userSchema = userSchema; 
exports.validateUser = validateUser;
exports.validateLogin = validateLogin;
exports.User = User;