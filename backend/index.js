require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const credentialModel = require('./models/Credential');
const AllocatedRoomModel = require('./models/AllotedRoom');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to database');
  })
  .catch((err) => {
    console.log('connection failed', err);
  });

app.post('/register-page', async (req, res) => {
  const { password, studentId } = req.body;
  try {
    const user = await credentialModel.findOne({ studentId });
    if (!user) {
      const data = {
        studentId,
        password
      };
      await credentialModel.insertMany([data]);
      res.json('RegistrationSuccess');
    } else {
      res.json('ExistingUser');
    }
  } catch (error) {
    console.error('Error in registration:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/login-page', async (req, res) => {
  const { password, studentId } = req.body;
  try {
    const user = await credentialModel.findOne({ studentId });
    if (user) {
      if (user.password === password) {
        res.json('Success');
      } else {
        res.json('Failed');
      }
    } else {
      res.json('Invalid');
    }
  } catch (error) {
    console.error('Error in login:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/aquamarine-room-page', async (req, res) => {
  const { selectedBlock, selectedFloor, selectedRoom, studentId } = req.body;

  try {
    // Validate input data
    if (!selectedBlock || !selectedFloor || !selectedRoom || !studentId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check if the room is already allocated to this student
    const existingAllocation = await AllocatedRoomModel.findOne({ studentId });
    if (existingAllocation) {
      return res.json('AllocationFailed'); // Room already allocated to this student
    }

    // Check if the room is already allocated to someone else
    const roomAllocated = await AllocatedRoomModel.findOne({
      selectedBlock,
      selectedFloor,
      selectedRoom,
    });
    if (roomAllocated) {
      return res.json('RoomAlreadyAllocated'); // Room is taken by another student
    }

    // Proceed with the allocation if the room is available
    const newAllocation = new AllocatedRoomModel({
      selectedBlock,
      selectedFloor,
      selectedRoom,
      studentId,
    });
    await newAllocation.save();
    
    res.json('AllocationSuccess'); // Successfully allocated the room
  } catch (error) {
    console.error('Error in room allocation:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.post('/aquamarine-room-page-check-alloted', async (req, res) => {
  const { studentId } = req.body;
  try {
    const user = await AllocatedRoomModel.findOne({ studentId });
    if (user) {
      res.json('AlreadyAlloted');
    } else {
      res.json('NotYetAlloted');
    }
  } catch (error) {
    console.error('Error in checking allocation:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/occupied-rooms', async (req, res) => {
  const { selectedBlock, selectedFloor } = req.body;
  try {
    const occupiedRooms = await AllocatedRoomModel.find({
      selectedBlock,
      selectedFloor
    });

    const rooms = occupiedRooms.map(room => room.selectedRoom);
    res.json(rooms);
  } catch (error) {
    console.error('Error fetching occupied rooms:', error);
    res.status(500).send('Internal Server Error');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`connected to port ${PORT}`);
});

