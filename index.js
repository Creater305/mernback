
process.traceDeprecation = true;
import express from "express"
//const express =require("express") 

 import cors from "cors"



 import newsRoute from "./controller/newsRoute.js"
 import bodyparser from 'body-parser';



//const cors =require("cors")
import mongoose from "mongoose"
const app=express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

mongoose.connect("mongodb+srv://kingsinha7305:1234@cluster0.uaqx5yj.mongodb.net/pro1")

.then(()=>{
console.log("mongodb connected");
})
.catch(()=>{
console.log('failed');
})

const newSchema=new mongoose.Schema({
email:{
type: String,
required: true
},
password: {
type: String,
required: true
}
})

const collection=mongoose.model("collection",newSchema)
mongoose.set('strictQuery', true);


app.get("/",cors(),(req,res)=>{
  
})

app.post("/", async(req,res)=>{
    const{email, password}=req.body



    try{
        const check=await collection.findOne({email: email,password:password})

        if(check){
            
          
            console.log("Password is correct.");
            res.json("exist");
            

        }

        else{
            res.json("Not exist")
            
        }
   
   
   
    }

    catch(e){
        res.json("notexist")
        console.log("other error")

    }
})




app.post("/signup",async(req,res)=>{
    const{email,password}=req.body

      const data={
        email:email,
        password:password

      }

    try{
        const check=await collection.findOne({email:email})

        if(check){
            res.json("exist")
        }
        else{
            res.json("Not exist")
            await collection.insertMany([data])
        }
    }

    catch(e){
        res.json("notexist")

    }
})










app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use(cors());
app.use("/newsRoute",newsRoute);



app.listen(8000, () => {
    console.log("port connected")
  }).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log('Port 8000 is already in use. Trying a different port...');
      app.listen(8001, () => {
        console.log("port connected on 8001")
      });
    } else {
      console.error(err);
    }
  });