const express = require("express");
const router = express.Router();
const db = require("../models");
const axios = require("axios");

// GET /pokemon - return a page with favorited Pokemon
router.get("/", async function(req, res)
{
  try
  {
    let pokes = await db.pokemon.findAll(); 
    res.render("favs", {pokemon: pokes});
  } 
  catch (err)
  {
    res.send(err, "Error");
  }
});

router.post("/", async function(req, res)
{
  try 
  {
    await db.pokemon.findOrCreate(
    {
      where: 
      {
        name: req.body.name
      }
    });
    res.redirect("/pokemon");

  }
  catch (err)
  {
    console.log("Error", error);
  }
});


router.get("/:name", async function(req,res)
{
 try 
 {
    if (req.params && req.params.name)
    {
      let pokeURL = `https://pokeapi.co/api/v2/pokemon/${req.params.name.toLowerCase()}`;
      let result = await axios.get(pokeURL);
      let pokeData = result.data;
      res.render("show", {pokemon: pokeData});
    }
  } 
  catch(err) 
  {
    res.send("error");
  }
});

module.exports = router;