const express = require("express");
const baseQuery = "/api/";
const app = express(); 


    // static routes 
app.get(baseQuery, (req, res) => {
    res.json({
      success: "true",
    });
  });

  // routing 

app.use(baseQuery + "flavors", require ("./flavors"));


app.listen(8080, () => {
    console.log("App is running at port 8080");
  });
