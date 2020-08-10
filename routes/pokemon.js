var express = require('express');
var router = express.Router();
var db = require("../models");

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) 
{
  db.pokemon.findAll().then(function(poke) 
  {
    console.log('Found: ', poke.name);
  });
  // TODO: Get all records from the DB and render to view
  res.render("favs", {pokemon: db.pokemon.findAll()});
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) 
{
  // Make sure to require your models in the files where they will be used.
  // db.pokemon.create(
  //   {
  //     name: req.params.name
  //   })
  //   .then(function(poke) 
  //   {
  //     console.log('Created: ', poke.name)
  //   });

  // TODO: Get form data and add a new record to DB
  db.pokemon.findOrCreate(
    {
      where:
      {
        name: req.body.name
      }
    }
  )
  res.redirect("/pokemon");
  //res.send(req.body);
});

module.exports = router;
