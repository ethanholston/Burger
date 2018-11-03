var orm = require("orm.js");

var burger = {
  selectAll = function(cb) {
    orm.selectAll("burgers", function(res){
      cb(res);
    })
  },
  insertOne = function(cols, vals, cb){
    orm.insertOne("burgers", cols, vals, function(res) {
      cb(res);
    });
  },
  updateOne = function(colVals, condition) {
    orm.updateOne("burgers", colVals, condition, function(res) {
      cb(res);
    });
  }
}