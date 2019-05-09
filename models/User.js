const Sequelize = require('sequelize')
const db = require("../database/db.js")


module.exports = db.sequelize.define(
   'user',
   {

      firstName: {
         type: Sequelize.STRING
      },

      lastName: {
         type: Sequelize.STRING
      },

      email: {
         type: Sequelize.STRING
      },

      password: {
         type: Sequelize.STRING
      },

      created: {
         type: Sequelize.DATE,
         defaultValue: Sequelize.NOW
      }
   },
   {
      timestamps: false
   }
)