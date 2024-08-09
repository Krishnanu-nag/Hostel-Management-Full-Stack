// import { useState } from "react";
// import "./ConfirmRoom.css";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// // Access the base URL from the environment variables
// const baseURL = import.meta.env.VITE_BASE_URL;

// function ConfirmRoom(data) {
//   const navigate = useNavigate();
//   const [buttonText, setButtonText] = useState('Submit');
//   const [isButtonDisabled, setIsButtonDisabled] = useState(false);

//   const confirmSubmit = async (e) => {
//     e.preventDefault();
//     setButtonText('Submiting...');
//     setIsButtonDisabled(true);

//     if (studentId !== "Admin") {
//       await axios
//         .post(`${baseURL}/aquamarine-room-page`, {
//           selectedBlock,
//           selectedFloor,
//           selectedRoom,
//           studentId,
//         })
//         .then((result) => {
//           if (result.data === "AllocationSuccess") {
//             alert(`Success your allotted room is ${data.block}/${data.floor}/${data.room}`);
//             navigate("/room-booked-page");
//             localStorage.setItem("selectedBlock", selectedBlock);
//             localStorage.setItem("selectedFloor", selectedFloor);
//             localStorage.setItem("selectedRoom", selectedRoom);
//           }
//           else alert(`You have been already allocated a room`  );
//           navigate("/room-booked-page")
//         })
//         .catch((err) => {
//           console.log("Network issue");
//           console.log(err.response.data);
//         })
//     } else {
//       alert(`Success !! ${localStorage.getItem("studentId")} your allotted room is ${data.block}/${data.floor}/${data.room} . Since you are a Guest,Allocated room will not be registered in the database !!`);
//       navigate("/thanks-page");
//       setButtonText('Submit');
//       setIsButtonDisabled(false);
//     }
//   };

//   const selectedBlock = data.block;
//   const selectedFloor = data.floor;
//   const selectedRoom = data.room;
//   const studentId = localStorage.getItem("studentId");
//   const [isAgreed, setIsAgreed] = useState(false);

//   return (
//     <> 
//        <br/>
//        <br/>
//       <div className="confirmRoom">
//         <div className="container" id="block">
//           <h1>{data.block}</h1>
//         </div>
//         <h1>/</h1>
//         <div className="container" id="floor">
//           <h1>{data.floor}</h1>
//         </div>
//         <h1>/</h1>
//         <div className="container" id="room">
//           <h1>{data.room}</h1>
//         </div>
//       </div>
//       <br />
//       {data.room !== "" && (
//         <div className="confirmation">
//           <input
//             type="checkbox"
//             onChange={(e) => setIsAgreed(e.target.checked)}
//           />{" "}
//           I agree that all choices made above are done by me and after I submit
//           no changes can be made further.
//           <br />
//           <br />
//           {isAgreed && (
//             <button onClick={confirmSubmit} disabled={isButtonDisabled}>
//               {buttonText}
//             </button>
//           )}
//           <br />
//           <br />
//         </div>
//       )}
//     </>
//   );
// }

// export default ConfirmRoom;



import { useState } from "react";
import "./ConfirmRoom.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Access the base URL from the environment variables
const baseURL = import.meta.env.VITE_BASE_URL;

function ConfirmRoom(data) {
  const navigate = useNavigate();
  const [buttonText, setButtonText] = useState('Submit');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const confirmSubmit = async (e) => {
    e.preventDefault();
    setButtonText('Submitting...');
    setIsButtonDisabled(true);

    try {
      const result = await axios.post(`${baseURL}/aquamarine-room-page`, {
        selectedBlock: data.block,
        selectedFloor: data.floor,
        selectedRoom: data.room,
        studentId: localStorage.getItem("studentId"),
      });

      if (result.data === "AllocationSuccess") {
        alert(`Success! Your allotted room is ${data.block}/${data.floor}/${data.room}`);
        navigate("/room-booked-page");
        localStorage.setItem("selectedBlock", data.block);
        localStorage.setItem("selectedFloor", data.floor);
        localStorage.setItem("selectedRoom", data.room);
      } else if (result.data === "RoomAlreadyBooked") {
        alert(`The room ${data.block}/${data.floor}/${data.room} is already booked by someone else. Please try to book a different room.`);
        setButtonText('Submit');
        setIsButtonDisabled(false);
      } else if (result.data === "AllocationFailed") {
        alert('You have already been allocated a room.');
        navigate("/room-booked-page");
      }
    } catch (err) {
      console.log("Network issue");
      console.log(err.response.data);
      alert('There was a problem with your request. Please try again.');
      setButtonText('Submit');
      setIsButtonDisabled(false);
    }
  };

  const [isAgreed, setIsAgreed] = useState(false);

  return (
    <> 
      <br />
      <br />
      <div className="confirmRoom">
        <div className="container" id="block">
          <h1>{data.block}</h1>
        </div>
        <h1>/</h1>
        <div className="container" id="floor">
          <h1>{data.floor}</h1>
        </div>
        <h1>/</h1>
        <div className="container" id="room">
          <h1>{data.room}</h1>
        </div>
      </div>
      <br />
      {data.room !== "" && (
        <div className="confirmation">
          <input
            type="checkbox"
            onChange={(e) => setIsAgreed(e.target.checked)}
          />{" "}
          I agree that all choices made above are done by me, and after I submit, no changes can be made further.
          <br />
          <br />
          {isAgreed && (
            <button onClick={confirmSubmit} disabled={isButtonDisabled}>
              {buttonText}
            </button>
          )}
          <br />
          <br />
        </div>
      )}
    </>
  );
}

export default ConfirmRoom;
