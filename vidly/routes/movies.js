const {movieSchema, validateMovie} = require('../models/movie');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const Movie = mongoose.model('Movie',movieSchema);
router.get('/', async(req,res)=>{
    const movies = await Movie.find().sort('title');
    res.send(movies);
});
router.post('/', async(req,res)=>{
    const {error} = validateMovie(req.body);
    console.log("error in movies post API",error);
    console.log("req.body in movies post API",req.body);
    if(error) return res.status(400).send(error.details[0].message);
    let movie = new Movie({
        title:req.body.title,
        genres:req.body.genres,
        numberInStock:req.body.numberInStock,
        dailyRentalRate:req.body.dailyRentalRate
    });
    console.log("movieObj before saving",movie);
    movie = await movie.save();
    res.send(movie);
})
router.put('/:id', async(req,res)=>{
    const {error} = validateMovie(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    const movie = await Movie.findByIdAndUpdate(req.params.id,{
        title:req.body.title,
        genres:req.body.genres,
        numberInStock:req.body.numberInStock,
        dailyRentalRate:req.body.dailyRentalRate
    },{new:true});
    if(!movie) return res.status(404).send('The movie with the given ID was not found.');
    res.send(movie);
});
router.delete('/:id', async(req,res)=>{
    const movie = await Movie.findByIdAndRemove(req.params.id);
    if(!movie) return res.status(404).send('The movie with the given ID was not found.');
    res.send(movie);
});
router.get('/:id', async(req,res)=>{
    const movie = await Movie.findById(req.params.id);
    if(!movie) return res.status(404).send('The movie with the given ID was not found.');
    res.send(movie);
});
module.exports = router;
