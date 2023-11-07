const Joi = require('joi');
const mongoose = require('mongoose');
const {customerSchema} = require('./customer');
const {movieSchema} = require('./movie');
const rentalSchema = new mongoose.Schema({
    customer:{
        type: customerSchema,
        required:true
    },  
    movie:{
        type: movieSchema,
        required:true
    }, 
    dateOut:{
        type:Date,
        required:true,
        default:Date.now
    },
    dateReturned:{
        type:Date
    },
    rentalFee:{
        type:Number,
        min:0
    }   
});
function validateRental(rental) {
    const schema = {
        customer: Joi.object({
            customerId: Joi.string().required(),
            name: Joi.string().min(5).max(50).required(),
            phone: Joi.string().min(5).max(50).required(),
            isGold: Joi.boolean()
        }).required(),
        movie: Joi.object({
            movieId: Joi.string().required(),
            title: Joi.string().required(),
            genres: Joi.object({
                name: Joi.string().min(5).max(50).required()
            }).required(),
            numberInStock: Joi.number().min(0).max(255).required(),
            dailyRentalRate: Joi.number().min(0).max(255).required()
        }).required(),
        dateOut: Joi.date().required(),        // 添加此行来验证dateOut字段
        dateReturned: Joi.date().optional(),   // 添加此行来验证dateReturned字段
        rentalFee: Joi.number().min(0).optional()  // 添加此行来验证rentalFee字段
    };

    return Joi.validate(rental, schema);
    // return true;
}

exports.rentalSchema = rentalSchema;
exports.validateRental = validateRental;