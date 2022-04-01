const express = require('express');
const app = express();
const User = require('./server/modals/user')
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {JWT_SECRET,MONGOURL} = require('./config/keys');
const Quotes = require('./server/modals/quotes')
const PORT = 5000;
mongoose.connect(MONGOURL, {});
mongoose.connection.on('connected', () => {
  console.log("connected to mongoDB")
})
mongoose.connection.on('error', (err) => {
  console.log("error", err) 
})
app.use(express.json())

const requireLogin = (req,res,next)=>{
  const {authorization} =  req.headers;

  if (!authorization){
   return res.status(401).json({error:"you must be logged in"})
  }

  try{
    const {userId} = jwt.verify(authorization,JWT_SECRET)
    req.user= userId
    next();
  }catch(err){
    res.status(401).json({error:"you must be logged in"})
  }
  
}



app.post('/signup', async (req, res) => {
  console.log("singinup called", req.body)
  const { firstName, lastName, email, password } = req.body;
  try {
    const user = await User.findOne({ email })
    if (user) {
      return res.status(422).json({ error: "user already exist with this email" })
    }
    const hashedPassword = await bcrypt.hash(password, 12)
    await new User({
      firstName,
      lastName,
      email,
      password: hashedPassword
    }).save();
    res.status(200).json({ message: "you are signup successfully" })
  } catch (err) {
    console.log(err)
  }
})


app.post('/signin', async (req, res) => {
  const {email, password } = req.body;
  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({ error: "User doesnot exist with this email" })
    }
  const doMatch = await bcrypt.compare(password,user.password)
  if (doMatch){
   const token = jwt.sign({userId :user.user_id},JWT_SECRET)
   res.status(201).json({token})
  }else{
    return res.status(404).json({ error: "Incorrect email or password" })
  }
  } catch (err) { 
    console.log(err)
  }
})

app.post ('/createquotes',requireLogin,async(req,res)=>{
const data =  await new Quotes({
     quotes:req.body.quotes,
     quotesBy: req.user,
   }).save() 
   res.status(201).json({message:data})
})
app.get('/getquotes',requireLogin, async(req,res)=>{
  const data = await Quotes.find({
      quotesBy:req.user
    })
    res.status(200).json({message:data})
})
app.delete('/remove/:id',async(req,res)=>{
 const removedQuote  = await Quotes.findByIdAndRemove({_id:req.params.id})
 res.status(200).json({message:removedQuote })
})

if(process.env.NODE_ENV=='production'){
   const path = require('path')
   app.get('/',(req,res)=>{ 
     app.use(express.static(path.resolve(__dirname,"toolkit",'build')))
     res.sendFile(path.resolve(__dirname,"toolkit",'build','index.html'))
   })
}
app.listen(PORT, () => {
  console.log(`Server is Running on Port ${PORT}`)
})

