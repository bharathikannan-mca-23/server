const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());

// Routes
app.get("/", function(req,res){
   res.send("welcome to express"); 
});
app.get('/data',function(req,res){
   Data.find().then((item)=>res.send(item))
})
app.post('/create',function(req,res){
    Data.create(req.body).then((item)=>res.send(item))
})
app.put('/update/:id',async(req,res)=>{
    console.log(req.params.id);
     console.log(req.body);
   const amount = req.body.amount;
   
  const userUpdate= await Data.findByIdAndUpdate(req.params.id,{amount:amount},{new:true,});
    res.json({
     data:userUpdate
})
})
app.delete('/delete/:id',async(req,res)=>{
    console.log(req.params.id);
    const userDelete= await Data.findByIdAndDelete(req.params.id);
    res.json({
     data:userDelete
})
})


mongoose.connect("mongodb+srv://bharathikannankuppusamy:bharathi@bharathi.kc6z5rz.mongodb.net/").then(console.log("MongoDB Connected"));
var newSchema=new mongoose.Schema({
    id:Number,
    name:String,
    email:String,
    password:String,
    amount:Number


})

let Data=mongoose.model('mca',newSchema)



app.listen(8080, function(){
    console.log('Server running at http://localhost:8080/');
});
