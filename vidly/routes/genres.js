
const authObj = require('../middleware/auth');
const validateObjectId = require("../middleware/validateObjectId");
const {genreSchema, validate} = require('../models/genre');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const admin = require('../middleware/admin');
const asyncMiddleware = require('../middleware/async');
require('winston-mongodb');
//console.log("adminObj",admin);
const Genre = mongoose.model('Genre',genreSchema);
router.get('/', asyncMiddleware(async (req, res) => {
  //throw new Error('Could not get the genres.');
  const genres = await Genre.find().sort('name');
  res.send(genres);
}));
// console.log("auth: ",authObj);
router.post('/',authObj ,async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);
  let genre = new Genre({ name: req.body.name });
  genre = await genre.save();
  res.send(genre);
});

router.put('/:id', [authObj,validateObjectId],async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
    new: true
  });

  if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  
  res.send(genre);
});

router.delete('/:id',[authObj,admin,validateObjectId], async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);
  if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  res.send(genre);
});

router.get('/:id', validateObjectId, async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  res.send(genre);
});

module.exports = router;