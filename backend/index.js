// here we write our api codes
const express=require("express") 
const mongoose=require("mongoose") 
const cors=require("cors") 
const credentialModel=require("./models/Credential")
const AllocatedRoomModel = require("./models/AllotedRoom")
const app=express()
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())
app.use(express.json());



mongoose.connect("mongodb://localhost:27017/student")
.then(()=>{
    console.log("connected to database")
    
})
.catch(()=>{
    console.log("connection failed")
})


app.post("/register-page",async (req,res)=>{
    const {password,studentId}=req.body
    credentialModel.findOne({studentId:studentId})
    .then(async(user)=>{
        if(!user){
            const data={
                studentId:studentId,
                password:password       
            }
            await credentialModel.insertMany([data])
            res.json("RegistrationSuccess")
        }
        else res.json("ExistingUser")

    })


})
app.post("/login-page",async (req,res)=>{
    const {password,studentId}=req.body
    credentialModel.findOne({studentId:studentId})
    .then(user=>{
        if(user){
            if (user.password===password){
                res.json("Success")
            }
            else{
                res.json("Failed")
            }

        }
        else{
            res.json("Invalid")
        }

    })



})

app.post("/aquamarine-room-page",async (req,res)=>{
    const {selectedBlock,selectedFloor,selectedRoom}=req.body
    const data={
                selectedBlock:selectedBlock,
                selectedFloor:selectedFloor,    
                selectedRoom:selectedRoom,   
            }
            AllocatedRoomModel.insertMany([data])
            res.json("AllocationSuccess")    }
    
     )

app.listen(3000,()=>{
    console.log(`connected to port 3000`)
})