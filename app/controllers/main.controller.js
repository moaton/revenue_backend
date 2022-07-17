const db = require("../models");
const accounts = db.accounts;
const revenues = db.revenues;

const bcrypt = require('bcrypt');
const saltRounds = 10;

const Op = db.Sequelize.Op;
exports.create = async (req, res) => {
  
  if(req.body && req.body.username && req.body.password){
    const resultsCash = await db.sequelize.query(
      `select * from accounts where accounts.username = '${req.body.username}'`,{ type: db.sequelize.QueryTypes.SELECT}
    );
    if(resultsCash.length === 0){
      bcrypt.genSalt(saltRounds, async function(err, salt) {
        bcrypt.hash(req.body.password, salt, async function(err, hash) {
            if(!err){
              let id = null
              await accounts.create({username: req.body.username, password: hash}).then(response => {
                id = response.id
                revenues.create({id: response.id, revenue: 0})
              })
              res.send({message: 'success', id})
            }
        });
    });
    } else {
      bcrypt.compare(req.body.password, resultsCash[0].password, async function(err, result) {
        if(result){
          let data = await revenues.findOne({where: {id: resultsCash[0].id} })
          res.send(data.dataValues)
        } else {
          res.status(404).send({message: 'the user has been created'})
        }
      });
    }
  }
};
exports.findAll = async (req, res) => {  
  console.log(req, 'req2');
};
exports.findOne = async (req, res) => {
  let data = await revenues.findOne({where: {id: req.params.id}})
  res.send(data.dataValues)
};
exports.update = async (req, res) => {
  let data = null
  const response = await revenues.update({id: req.body.id, revenue: req.body.revenue, expenses: req.body.expenses}, {where: {id: req.body.id}}).then(() => {
    return revenues.findOne({where: {id: req.body.id}})
  })
  if(response){
    res.send(response.dataValues)
  }

};
exports.delete = (req, res) => {
  
};
exports.deleteAll = (req, res) => {
  
};