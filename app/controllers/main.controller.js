const db = require("../models");
const accounts = db.accounts;
const revenues = db.revenues;

const bcrypt = require('bcrypt');
const saltRounds = 10;

const Op = db.Sequelize.Op;
exports.create = async (req, res) => {
  try {
    if(req.body && req.body.username && req.body.password){
      const resultsCash = await accounts.findAll({where: {username: req.body.username.toLowerCase()}})
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
        bcrypt.compare(req.body.password, resultsCash[0].dataValues.password, async function(err, result) {
          if(result){
            let data = await revenues.findOne({where: {id: resultsCash[0].id} })
            res.send(data.dataValues)
          } else {
            res.status(404).send({message: 'the user has been created'})
          }
        });
      }
    }
  } catch (error) {
    res.status(500).send(error)
  }
  
};
exports.findAll = async (req, res) => {  
  console.log(req, 'req2');
};
exports.chartData = async (req, res) => {
  let data = await revenues.findOne({where: {id: req.params.id} })
  let expenses = JSON.parse(data.dataValues.expenses),
  take = req.query.take
  let categories = [], series = [], categoryCost = 0
  let from = new Date(), to = new Date()
  switch (take) {
    case 'day':
      from.setDate(from.getDate() - 1)
      break;
    case 'week':
      from.setDate(from.getDate() - 7)
      break;
    case 'month':
      from.setDate(from.getDate() - 30)
      break;
    case 'three_month':
      from.setDate(from.getDate() - 90)
      break
    case 'six_month':
      from.setDate(from.getDate() - 180)
      break
    case 'year':
      from.setDate(from.getDate() - 365)
      break
    default:
      break;
  }
  expenses.filter(item => new Date(item.date) >= from && new Date(item.date) <= to).sort((a, b) => a.type > b.type ? 1 : -1).map(item => {
    if(categories.findIndex(el => el === item.type) === -1){
      categories.push(item.type)
    }
  })
  categories.map(category => {
    categoryCost = 0
    expenses.filter(item => new Date(item.date) >= from && new Date(item.date) <= to).sort((a, b) => a.type > b.type ? 1 : -1).filter(sItem => sItem.type === category).map(sItem => {
      categoryCost += sItem.cost
    })
    series.push(categoryCost)
  })
  res.send({categories, series})
}
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