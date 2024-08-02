const mongoose=require("mongoose")

const AllotedRoomSchema=new mongoose.Schema({
    selectedBlock:{
       type: String,
       required:true,
    }, 
    selectedFloor:{
       type: String,
       required:true,
    }, 
    selectedRoom:{
        type:String, 
        required:true,
    },                      ///string x it should be String capital S
    studentId:{
        type:String, 
        required:true,
    },                      ///string x it should be String capital S
})

const AllocatedRoomModel=mongoose.model("AllocatedRoom",AllotedRoomSchema)
module.exports =AllocatedRoomModel

//AllocatedRoom is the name of collection under student table and it adds s when initialised and becomes allocatedrooms