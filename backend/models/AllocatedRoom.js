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
