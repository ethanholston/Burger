var express = require("express");
var router = express();
var burger = require("../models/burger.js");

router.get("/api/burgers", function(req, res) {
  burger.selectAll(function(data) {
    res.json(data);
    console.log(data);
  });
});

router.post("/api/burgers", function(req, res) {
  burger.insertOne(["burger_name", "burger_desc", "devoured"], [req.body.name, req.body.desc, false], function(result) {
    res.json({ id: result.insertId });
  });
});

router.put("/api/burgers/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);
  console.log(req.body.devoured);

  burger.updateOne("devoured = " + req.body.devoured, condition, function(result) {
    if (result.changedRows === 0) {
      return res.status(404).end();
    }
    res.status(200).end();
  });
});

module.exports = router;