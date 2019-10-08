const Sequelize = require('sequelize');
const db = require('../db')

const Feeds = db.define('feeds', {
    // attributes
    name: {
      type: Sequelize.STRING,
      allowNull: true
    },
    image: {
      type: Sequelize.STRING,
      allowNull: true
    },
    description: {
        type: Sequelize.STRING,
        allowNull: true
    },
    dateLastEdited: {
        type: Sequelize.STRING,
        allowNull: true
      }
  }, {
    timestamps: false
  });

  module.exports = Feeds;