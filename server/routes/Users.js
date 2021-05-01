const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt")
const {sign} = require("jsonwebtoken")
const {validateToken} = require("../middlewares/AuthMiddlewares")

router.post("/", async (req, res) => {
  const {username, password} = req.body;
  bcrypt.hash(password,10).then((hash)=>{
    Users.create({
      username: username,
      password: hash
    })
      res.json("SUCCESS");
  })
});

router.post("/Login",async (req,res) => {
  const {username, password} = req.body;
  console.log(req.body)
  const user = await Users.findOne({ where: {username: username}})
  if(!user) return res.json({Error: "User does not exist"})

  bcrypt.compare(password,user.password).then((match) => {
    if(!match) return res.json({Invalid: "Invalid credentials"})
    const accessToken = sign({username: user.username,id:user.id},"rajendra");
    res.json({Message: "Login Successfull",token:accessToken})
  })

})

router.get("/auth",validateToken,(req,res) => {
  res.json(req.user)
})

module.exports = router;
