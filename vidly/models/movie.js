const {genreSchema} = require('./genre');
const Joi = require('joi');
const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    genres: { type: [genreSchema], required: true},  // 注意这里使用了 [genreSchema]
    numberInStock: { type: Number, required: true, min: 0, max: 255 },
    dailyRentalRate: { type: Number, required: true, min: 0, max: 255 }
});


const Movie = mongoose.model('Movie',movieSchema);
function validateMovie(movie){
    const schema = {
        title:Joi.string().required(),
        genres:Joi.array().required(),
        numberInStock:Joi.number().required().min(0).max(255),
        dailyRentalRate:Joi.number().required().min(0).max(255)
    };
    return Joi.validate(movie,schema);
}
exports.movieSchema = movieSchema;
exports.validateMovie = validateMovie;
exports.Movie = Movie;
