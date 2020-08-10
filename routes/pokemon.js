const express = require("express");
const router = express.Router();
let db = require("../models");

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

module.exports = router;