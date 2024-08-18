const mongoose=require("mongoose")

const Studentschema=new mongoose.Schema({
    studentId:{
       type: String,
       required:true,
    }, 
    studentName:{
       type: String,
       required:true,
    }, 
    password:{
        type:String, 
        required:true
    }  
})

const credentialModel=mongoose.model("credential",Studentschema)
module.exports =credentialModel