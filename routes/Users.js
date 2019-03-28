const express= require("express")
const users=express.Router()
const cors= require("cors")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt-nodejs")

const User = require("../models/User")
users.use(cors())

process.env.SECRET_KEY = 'secret'

//REGISTER

users.get('/test',(req,res)=>{
  res.send("hellow")
})

users.post('/register',(req, res)=>{
   const today= new Date()
   const userData = { 
        first_name : req.body.first_name,
        last_name : req.body.last_name,
        email : req.body.email,
        password : req.body.password,
        created : today
   } 
    User.findOne({
       where :{
            email: req.body.email
       }

    })
       .then(user =>{
           if(!user){
               const hash = bcrypt.hashSync(userData.password, 10)
               userData.password = hash
               User.create(userData)
               .then(user =>{
                    let token = jwt.sign(user.dataValues, process.env.SECRET_KEY,{
                          expiresIn :1440
                    })
                      res.json({ token:token})
               })
               .catch(err =>{
                 res.send('error' + err)
               }) 
           }else{
               res.json({error : 'User already exist'})
           } 
       })
       .catch(err =>{
        res.send('error' + err)
      })
}) 

// LOGIN
  users.post('/login',(req, res)=> {
    console.log(req.body)
    User.findOne({
      where: {
           email: req.body.email
           //req.body kiyana eke thiyenne body parameters
           //req.query kiyana eke thiyenne query parameters
           //postman eken eeka select karala yawanna puluwan. query parameters enne url ekath ekkamai
           // body parameters enne request eke body ekath ekka
      }
    })
    .then(user =>{
         if(bcrypt.compareSync(req.body.password, user.password)){
             let token = jwt.sign(user.dataValues, process.env.SECRET_KEY,{
               expiresIn:1440
             })
             res.json({token : token})
         }else{
             res.send('User does not exist')
         }
    })
     .catch(err =>{
         res.send('error:' + err)
     })
  })

  //PROFILE
   users.get('/profile',(req, res) =>{
     var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

     users.findOne({
           where:{
               id:decoded.id
           }
     })
        .then(user =>{
            if(user) {
              res.json(user)
            } else{
              res.send("User Not Exist")
            }
        })
        .catch(err =>{
              res.send('error :' + err)
        })
   })
    module.exports = users

    