const mongoose=require("mongoose")

const Studentschema=new mongoose.Schema({
    studentId:{
       type: String,
       required:true,
    }, 
    password:{
        type:String, 
        required:true
    }  ///string x it should be String capital S
})

const credentialModel=mongoose.model("credential",Studentschema)
module.exports =credentialModel