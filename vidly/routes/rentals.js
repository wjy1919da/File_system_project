const {rentalSchema,validateRental} = require('../models/rental');
const {movieSchema} = require('../models/movie');
const {customerSchema} = require('../models/customer');
const mongoose = require('mongoose');
const express = require('express');
const Fawn = require('fawn');
const router = express.Router();
const Customer = mongoose.model('Customer',customerSchema);
const Movie = mongoose.model('Movie',movieSchema);
const Rental = mongoose.model('Rental',rentalSchema);
router.post('/',async (req,res) => {
    //console.log("req.body",req.body);
    const {error} = validateRental(req.body);
    //console.log("error",error);
    if(error) return res.status(400).send(error.details[0].message);
    //console.log("req.body.customerId",req.body.customer.customerId);
    const customer = await Customer.findById(req.body.customer.customerId);
    //console.log("customer",customer);
    if(!customer) return res.status(400).send('Invalid customer.');
    const movie = await Movie.findById(req.body.movie.movieId);
    if(!movie) return res.status(400).send('Invalid movie.');
    if(movie.numberInStock === 0) return res.status(400).send('Movie not in stock.');
    const rental = new Rental({
        customer:{
            _id:customer._id,
            name:customer.name,
            phone:customer.phone
        },
        movie:{
            _id:movie._id,
            title:movie.title,
            dailyRentalRate:movie.dailyRentalRate,
            numberInStock:movie.numberInStock
        },
        dayOut:req.body.dayOut,
        dayReturned:req.body.dayReturned,
        rentalFee:req.body.rentalFee
    });
    try {
        await new Fawn.Task()
            .save('rentals', rental)
            .update('movies', { _id: movie._id }, {
                $inc: { numberInStock: -1 }
            })
            .run();  // 这一行非常重要，确保事务被执行
        console.log("rental",rental);
        res.send(rental);
    }
    catch (ex) {
        console.error(ex);  // 这会输出错误到控制台
        res.status(500).send('Something failed.');
    }  
});
module.exports = router;