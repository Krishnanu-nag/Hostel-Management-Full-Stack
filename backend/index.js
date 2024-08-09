// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const credentialModel = require('./models/Credential');
// const AllocatedRoomModel = require('./models/AllotedRoom');

// const app = express();
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(cors());

// mongoose.connect(process.env.MONGODB_URI)
//   .then(() => {
//     console.log('connected to database');
//   })
//   .catch((err) => {
//     console.log('connection failed', err);
//   });

// app.post('/register-page', async (req, res) => {
//   const { password, studentId } = req.body;
//   try {
//     const user = await credentialModel.findOne({ studentId });
//     if (!user) {
//       const data = {
//         studentId,
//         password
//       };
//       await credentialModel.insertMany([data]);
//       res.json('RegistrationSuccess');
//     } else {
//       res.json('ExistingUser');
//     }
//   } catch (error) {
//     console.error('Error in registration:', error);
//     res.status(500).send('Internal Server Error');
//   }
// });

// app.post('/login-page', async (req, res) => {
//   const { password, studentId } = req.body;
//   try {
//     const user = await credentialModel.findOne({ studentId });
//     if (user) {
//       if (user.password === password) {
//         res.json('Success');
//       } else {
//         res.json('Failed');
//       }
//     } else {
//       res.json('Invalid');
//     }
//   } catch (error) {
//     console.error('Error in login:', error);
//     res.status(500).send('Internal Server Error');
//   }
// });

// app.post('/aquamarine-room-page', async (req, res) => {
//   const { selectedBlock, selectedFloor, selectedRoom, studentId } = req.body;
//   try {
//     const user = await AllocatedRoomModel.findOne({ studentId });
//     if (!user) {
//       const data = {
//         selectedBlock,
//         selectedFloor,
//         selectedRoom,
//         studentId,
//       };
//       await AllocatedRoomModel.insertMany([data]);
//       res.json('AllocationSuccess');
//     } else {
//       res.json('AllocationFailed');
//     }
//   } catch (error) {
//     console.error('Error in room allocation:', error);
//     res.status(500).send('Internal Server Error');
//   }
// });

// app.post('/aquamarine-room-page-check-alloted', async (req, res) => {
//   const { studentId } = req.body;
//   try {
//     const user = await AllocatedRoomModel.findOne({ studentId });
//     if (user) {
//       res.json('AlreadyAlloted');
//     } else {
//       res.json('NotYetAlloted');
//     }
//   } catch (error) {
//     console.error('Error in checking allocation:', error);
//     res.status(500).send('Internal Server Error');
//   }
// });

// app.post('/occupied-rooms', async (req, res) => {
//   const { selectedBlock, selectedFloor } = req.body;
//   try {
//     const occupiedRooms = await AllocatedRoomModel.find({
//       selectedBlock,
//       selectedFloor
//     });

//     const rooms = occupiedRooms.map(room => room.selectedRoom);
//     res.json(rooms);
//   } catch (error) {
//     console.error('Error fetching occupied rooms:', error);
//     res.status(500).send('Internal Server Error');
//   }
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`connected to port ${PORT}`);
// });






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
  
  // Start a session
  const session = await mongoose.startSession();
  session.startTransaction();
  
  try {
    // Check if the room is already allocated to someone else within the transaction
    const roomOccupied = await AllocatedRoomModel.findOne({ 
      selectedBlock, 
      selectedFloor, 
      selectedRoom 
    }).session(session);

    if (roomOccupied) {
      await session.abortTransaction(); // Abort the transaction
      session.endSession();
      return res.json('RoomAlreadyBooked');
    }

    // Check if the student already has an allocated room
    const user = await AllocatedRoomModel.findOne({ studentId }).session(session);
    if (user) {
      await session.abortTransaction(); // Abort the transaction
      session.endSession();
      return res.json('AllocationFailed');
    }

    // Allocate the room
    const data = {
      selectedBlock,
      selectedFloor,
      selectedRoom,
      studentId,
    };
    await AllocatedRoomModel.create([data], { session });

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();
    
    return res.json('AllocationSuccess');
  } catch (error) {
    console.error('Error in room allocation:', error);
    await session.abortTransaction(); // Abort the transaction in case of error
    session.endSession();
    res.status(500).send('Internal Server Error');
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

