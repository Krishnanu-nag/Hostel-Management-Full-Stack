// const mongoose=require("mongoose")
// const { type } = require("os")

// const AllotedRoomSchema=new mongoose.Schema({
//     Hostel:{
//         type: String,
//         required:true,
//     },
//     selectedBlock:{
//        type: String,
//        required:true,
//     }, 
//     selectedFloor:{
//        type: String,
//        required:true,
//     }, 
//     selectedRoom:{
//         type:String, 
//         required:true,
//     },                      ///string x it should be String capital S
//     studentId:{
//         type:String, 
//         required:true,
//     },                      ///string x it should be String capital S
// })

// const AllocatedRoomModel=mongoose.model("AllocatedRoom",AllotedRoomSchema)
// module.exports =AllocatedRoomModel

// //AllocatedRoom is the name of collection under student table and it adds s when initialised and becomes allocatedrooms


const mongoose = require('mongoose');

const AllotedRoomSchema = new mongoose.Schema({
    Hostel: {
        type: String,
        required: true,
    },
    selectedBlock: {
        type: String,
        required: true,
    },
    selectedFloor: {
        type: String,
        required: true,
    },
    selectedRoom: {
        type: String,
        required: true,
    },
    studentId: {
        type: String,
        required: true,
    },
    studentName: {
        type: String,
        required: true,
    }
});

const AllocatedRoomModel = mongoose.model('AllocatedRoom', AllotedRoomSchema);
module.exports = AllocatedRoomModel;
