module.exports = app => {
  const revenues = require("../controllers/main.controller.js");
  var router = require("express").Router();
  router.post("/", revenues.create);
  router.get("/", revenues.findAll);
  router.get("/:id", revenues.findOne);
  router.put("/:id", revenues.update);
  router.delete("/:id", revenues.delete);
  router.delete("/", revenues.deleteAll);
  app.use('/api/revenues', router);
};