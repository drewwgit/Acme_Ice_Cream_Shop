const express = require("express");
const router = express.Router();
const pg = require("pg");
const client = new pg.Client("postgres://localhost:5432/flavors");

client.connect((err) => {
    if (err) {
      console.error("Connection Error Has Occurred", err.stack);
    } else {
      console.log("Connected!");
    }
  });

// get all flavors 
  router.get("/", async (req, res, next) => {
    try {
        const response = await client.query(`SELECT * FROM flavorsavailable`);
        res.send(response.rows)
    } catch (err) {
        next (err)
    }
})

// get flavor by ID 

router.get('/:id', async(req, res, next)=>{
    try{
        const response = await client.query(`SELECT * FROM flavorsavailable WHERE id = $1`, [req.params.id]);
        res.send(response.rows[0])
    }catch(err){
        next(err)
    }
})


// add flavor 
router.post('/', async(req, res, next)=>{
    try{
        const response = await client.query(`INSERT INTO flavorsavailable(name, is_favorite) VALUES($1, $2)`,
            [req.body.name, req.body.is_favorite]);
        res.send({
            name: req.body.name,
            is_favorite: req.body.is_favorite,
        })
    }catch(err){
        next(err)
    }
})

// delete a flavor 

router.delete("/:id", async (req, res, next) => {
    try {
      const response = await client.query(`DELETE from flavorsavailable WHERE id =$1`, [
        Number(req.params.id),
      ]);
      res
        .send({
          id: req.params.id,
        })
        .sendStatus(204);
    } catch (err) {
      next(err);
    }
  });

  // update flavor 

  router.put("/:id", async(req,res,next)=>{
    try{
       const response = await client.query(`UPDATE flavorsavailable SET name=$1, is_favorite=$2 updated_at=$3 RETURNING *`,
           [req.body.name, Number(req.body.is_favorite), Number(req.params.id) ]);
       res.send(response.rows[0])
    }catch(err){
        next(err)
    }
})


module.exports = router; 