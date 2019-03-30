 const Sequelize = require("sequelize")
 const db={}
 const sequelize = new Sequelize('mysql://bd9b5c7dace288:6c4d9d48@us-cdbr-iron-east-03.cleardb.net/heroku_4c73b39b13258ec?reconnect=true')


//  const sequelize = new Sequelize("login","root","",{
//     host : "localhost",
//     dialect : "mysql",
//     operatorAliases: false,

//      pool:{
//           max:5,
//           min:0,
//           acquire:30000,
//           idle:10000

//      }

//  })

    db.sequelize=sequelize
    db.Sequelize=Sequelize 

    module.exports = db;