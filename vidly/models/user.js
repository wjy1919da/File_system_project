const Joi = require('joi');
const config = require('config');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
   email: {
         type:String,
         required:true,
         minlength:5,
         maxlength:255,
         unique:true
    },
   password:{
         type:String,
         required:true,
         minlength:5,
         maxlength:1024
    },
    isAdmin: Boolean
});
userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id:this._id, isAdmin: this.isAdmin},config.get('jwtPrivateKey'));
    return token;
}
const User = mongoose.model('User',userSchema);
function validateUser(user) {
  const schema = {
    email: Joi.string().min(5).max(255).required().email(), // 添加此行来验证email字段
    password: Joi.string().min(5).max(255).required()      // 添加此行来验证password字段
  };
  return Joi.validate(user, schema);
}
exports.userSchema = userSchema; 
exports.validateUser = validateUser;
exports.User = User;