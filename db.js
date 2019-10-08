const Sequelize = require('sequelize');

// Option 1: Passing parameters separately
module.exports= new Sequelize('customer', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

