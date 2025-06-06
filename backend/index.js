require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const credentialModel = require("./models/Credential");
const AllocatedRoomModel = require("./models/AllocatedRoom");
const OtpStoreModel = require("./models/OtpStore");
const nodemailer = require("nodemailer"); // New import for nodemailer

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.log("connection failed", err);
  });

// Check if the user already exists
app.post("/check-user", async (req, res) => {
  const { studentId } = req.body;
  try {
    const user = await credentialModel.findOne({ studentId });
    if (user) {
      res.json("ExistingUser");
    } else {
      res.json("NewUser");
    }
  } catch (error) {
    console.error("Error checking user:", error);
    res.status(500).send("Internal Server Error");
  }
});

// //wish user depending on at which time they interact with our server
// function getWish() {
//   const currentHour = new Date().getHours();

//   if (currentHour >= 4 && currentHour < 12) {
//     return "Good Morning";
//   } else if (currentHour >= 12 && currentHour < 18) {
//     return "Good Afternoon";
//   } else {
//     return "Good Evening";
//   }
// }

// Example usage
app.post("/send-otp", async (req, res) => {
  // const wish=getWish()
  const { studentId } = req.body;
  const email = `${studentId}@iitism.ac.in`; // Assuming studentId is the email address
  const otpdb = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP
  // console.log(otpdb)

  try {
    // Store OTP in the database
    await OtpStoreModel.findOneAndUpdate(
      { studentId },
      { otp: otpdb, createdAt: Date.now() },
      { upsert: true, new: true }
    );
    console.log("Otp stored in the database");

    // Setup nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "OTP for Registration ",
      text: `Hi ${studentId},\n\nHere is your OTP for registration : ${otpdb}\n\nThanks for Registering\nThe OTP is valid for the next 2 mins so hurry up and get yourself registered !!`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        res.status(500).send("Error sending OTP");
      } else {
        console.log("Email sent: " + info.response);
        res.status(200).json("OtpSent");
      }
    });
  } catch (error) {
    console.error("Error storing OTP:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Verify OTP and register the user
app.post("/verify-otp", async (req, res) => {
  const { studentId, otp, password, studentName } = req.body;

  try {
    // Retrieve the stored OTP from the database
    const storedOtp = await OtpStoreModel.findOne({ studentId });

    if (storedOtp && otp == storedOtp.otp) {
      {
        // Register the new user
        const newUser = new credentialModel({
          studentName,
          studentId,
          password,
        });
        await newUser.save();

        // Remove the OTP from the database after successful verification
        await OtpStoreModel.deleteOne({ studentId });

        res.json("OtpVerified");
      }
    } else {
      res.json("InvalidOtp");
    }
  } catch (error) {
    console.error("Error in OTP verification:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Forgot Password Route
app.post("/forgot-password", async (req, res) => {
  // const wish=getWish()
  const { studentId } = req.body;
  const email = `${studentId}@iitism.ac.in`; // Construct the email address

  try {
    // Find the user by studentId
    const user = await credentialModel.findOne({ studentId });

    if (user) {
      // Setup nodemailer
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: `Password for ${studentId}`,
        text: `Hi ${studentId},\n\nSince you have forgotten your password we are here to help you out\n\nYour password is : ${user.password}`,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
          res.status(500).send("Error sending email");
        } else {
          console.log("Email sent: " + info.response);
          res.status(200).json("PasswordSent");
        }
      });
    } else {
      res.json("UserNotFound");
    }
  } catch (error) {
    console.error("Error in forgot password:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/login-page", async (req, res) => {
  const { password, studentId } = req.body;
  try {
    const user = await credentialModel.findOne({ studentId });
    if (user) {
      if (user.password === password) {
        res.json("Success");
      } else {
        res.json("Failed");
      }
    } else {
      res.json("Invalid");
    }
  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/aquamarine-room-page", async (req, res) => {
  const { selectedBlock, selectedFloor, selectedRoom, studentId } = req.body;

  try {
    // Check if the student ID is provided
    if (!studentId) {
      return res.status(400).json({ error: "Student ID is required" });
    }

    // Fetch student name from the credentials or user model
    const student = await credentialModel.findOne({ studentId });
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    const studentName = student.studentName;
    // console.log(studentName)

    // Check if the room is already allocated
    const existingAllocation = await AllocatedRoomModel.findOne({
      selectedBlock,
      selectedFloor,
      selectedRoom,
    });
    if (existingAllocation) {
      return res.json("RoomAlreadyAllocated");
    }

    // Check if the student already has a room allocated
    const studentAllocation = await AllocatedRoomModel.findOne({ studentId });
    if (studentAllocation) {
      return res.json("AllocationExists");
    }

    // Create a new room allocation
    const newAllocation = new AllocatedRoomModel({
      Hostel: "Aquamarine",
      selectedBlock,
      selectedFloor,
      selectedRoom,
      studentId,
      studentName, // Store the studentName
    });

    await newAllocation.save();

    res.json("AllocationSuccess");
  } catch (error) {
    console.error("Error allocating room:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/aquamarine-room-page-check-alloted", async (req, res) => {
  const { studentId } = req.body;
  try {
    const user = await AllocatedRoomModel.findOne({ studentId });
    if (user) {
      res.json("AlreadyAlloted");
    } else {
      res.json("NotYetAlloted");
    }
  } catch (error) {
    console.error("Error in checking allocation:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/occupied-rooms", async (req, res) => {
  const { selectedBlock, selectedFloor } = req.body;
  try {
    const occupiedRooms = await AllocatedRoomModel.find({
      selectedBlock,
      selectedFloor,
    });

    const rooms = occupiedRooms.map((room) => room.selectedRoom);
    res.json(rooms);
  } catch (error) {
    console.error("Error fetching occupied rooms:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/find-student", async (req, res) => {
  const { studentId, studentName } = req.body;

  try {
    // Check if either studentId or studentName is provided
    if (!studentId && !studentName) {
      return res.status(400).json({ error: "Student ID or Name is required" });
    }

    // Find the allocated room by studentId or studentName
    const allocation = await AllocatedRoomModel.findOne({
      $or: [{ studentId }, { studentName }],
    });

    if (allocation) {
      // Respond with the student's room information
      res.json({
        hostel: allocation.Hostel,
        selectedBlock: allocation.selectedBlock,
        selectedFloor: allocation.selectedFloor,
        selectedRoom: allocation.selectedRoom,
        studentName:allocation.studentName,
      });
    } else {
      // Respond if the student does not have a room allocated
      res.json("RoomNotAllocated");
    }
  } catch (error) {
    console.error("Error finding student:", error);
    res.status(500).send("Internal Server Error");
  }
});

// For student name suggestions
app.get("/name-suggestions", async (req, res) => {
  const { name } = req.query;

  try {
    const suggestions = await AllocatedRoomModel
    // const suggestions = await credentialModel
      .find({ studentName: { $regex: new RegExp(name, "i") } }) // Case-insensitive search
      .limit(5) // Limit the number of suggestions
      .select("studentName -_id"); // Select only studentName field

    const names = suggestions.map((suggestion) => suggestion.studentName);
    res.json(names);
  } catch (error) {
    console.error("Error fetching name suggestions:", error);
    res.status(500).send("Internal Server Error");
  }
});

// For student ID suggestions
app.get("/id-suggestions", async (req, res) => {
  const { id } = req.query;

  try {
    // const suggestions = await credentialModel
    const suggestions = await AllocatedRoomModel
      .find({ studentId: { $regex: new RegExp(id, "i") } }) // Case-insensitive search
      .limit(5) // Limit the number of suggestions
      .select("studentId -_id"); // Select only studentId field

    const ids = suggestions.map((suggestion) => suggestion.studentId);
    res.json(ids);
  } catch (error) {
    console.error("Error fetching ID suggestions:", error);
    res.status(500).send("Internal Server Error");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`connected to port ${PORT}`);
});
