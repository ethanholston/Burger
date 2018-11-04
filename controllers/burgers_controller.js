var express = require("express");
var router = express();
var burger = require("../models/burger.js");

router.get("/api/burgers", function(req, res) {
  burger.selectAll(function(data) {
    // console.log(data);
    res.json(data);
    console.log(data);
  });
});

router.post("/api/burgers", function(req, res) {
  burger.insertOne(["burger_name", "devoured"], [req.body.name, false], function(result) {
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});

router.put("/api/burgers/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);
  console.log(req.body.devoured);

  burger.updateOne("devoured = " + req.body.devoured, condition, function(result) {
    if (result.changedRows === 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    }
    res.status(200).end();
  });
});

// Export routes for server.js to use.
module.exports = router;