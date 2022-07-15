module.exports = app => {
  const accounts = require("../controllers/main.controller.js");
  var router = require("express").Router();
  router.post("/", accounts.create);
  router.get("/", accounts.findAll);
  router.get("/:id", accounts.findOne);
  router.put("/:id", accounts.update);
  router.delete("/:id", accounts.delete);
  router.delete("/", accounts.deleteAll);
  app.use('/api/accounts', router);
};