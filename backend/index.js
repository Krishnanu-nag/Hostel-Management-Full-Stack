const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const credentialModel = require('./models/Credential');
const AllocatedRoomModel = require('./models/AllotedRoom');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/student')
  .then(() => {
    console.log('connected to database');
  })
  .catch(() => {
    console.log('connection failed');
  });

app.post('/register-page', async (req, res) => {
  const { password, studentId } = req.body;
  credentialModel.findOne({ studentId: studentId })
    .then(async (user) => {
      if (!user) {
        const data = {
          studentId: studentId,
          password: password
        };
        await credentialModel.insertMany([data]);
        res.json('RegistrationSuccess');
      } else res.json('ExistingUser');
    });
});

app.post('/login-page', async (req, res) => {
  const { password, studentId } = req.body;
  credentialModel.findOne({ studentId: studentId })
    .then(user => {
      if (user) {
        if (user.password === password) {
          res.json('Success');
        } else {
          res.json('Failed');
        }
      } else {
        res.json('Invalid');
      }
    });
});

app.post('/aquamarine-room-page', async (req, res) => {
  const { selectedBlock, selectedFloor, selectedRoom, studentId } = req.body;
  AllocatedRoomModel.findOne({ studentId: studentId })
    .then(user => {
      if (!user) {
        const data = {
          selectedBlock: selectedBlock,
          selectedFloor: selectedFloor,
          selectedRoom: selectedRoom,
          studentId: studentId,
        };
        AllocatedRoomModel.insertMany([data]);
        res.json('AllocationSuccess');
      } else res.json('AllocationFailed');
    });
});

app.post('/aquamarine-room-page-check-alloted?', async (req, res) => {
  const { studentId } = req.body;
  AllocatedRoomModel.findOne({ studentId: studentId })
    .then(user => {
      if (user) res.json('AlreadyAlloted');
      else res.json('NotYetAlloted');
    });
});

app.post('/occupied-rooms', async (req, res) => {
    const { selectedBlock, selectedFloor } = req.body;
    try {
      // Find all documents that match the selectedBlock and selectedFloor
      const occupiedRooms = await AllocatedRoomModel.find({
        selectedBlock: selectedBlock,
        selectedFloor: selectedFloor
      });
  
      // Extract the selectedRoom values
      const rooms = occupiedRooms.map(room => room.selectedRoom);
      
      res.json(rooms); // Send the array of selectedRoom values as the response
    } catch (error) {
      console.error('Error fetching occupied rooms:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  

app.listen(3000, () => {
  console.log('connected to port 3000');
});
