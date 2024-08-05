import { useState } from "react";
import "./ConfirmRoom.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Access the base URL from the environment variables
const baseURL = import.meta.env.VITE_BASE_URL;

function ConfirmRoom(data) {
  const navigate = useNavigate();

  let confirmSubmit = async (e) => {
    e.preventDefault();
    if(!(studentId=="Admin"))
    {await axios
      .post(`${baseURL}/aquamarine-room-page`, {
        selectedBlock,
        selectedFloor,
        selectedRoom,
        studentId,
      })
      .then((result) => {
        if (result.data === "AllocationSuccess") {
          alert(`Success your allotted room is ${data.block}/${data.floor}/${data.room}`);
          navigate("/room-booked-page");
          localStorage.setItem("selectedBlock", selectedBlock);
          localStorage.setItem("selectedFloor", selectedFloor);
          localStorage.setItem("selectedRoom", selectedRoom);
        }
        //  else {
        //   alert("User Exsits and already Room Alloted");
        //   navigate("/home-page")
        // }
      })
      .catch((err) => {
        console.log("Network issue");
        console.log(err.response.data);
      });}
      else {alert(`Success !! ${localStorage.getItem("studentId")} your allotted room is ${data.block}/${data.floor}/${data.room} . Since you are a Guest , allocation data will not be registered in database !! `);navigate("/thanks-page")}
  };

  const selectedBlock = data.block;
  const selectedFloor = data.floor;
  const selectedRoom = data.room;
  const studentId = localStorage.getItem("studentId");
  const [isAgreed, setIsAgreed] = useState(false);

  return (
    <>
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
            onChange={(e) => {
              if (e.target.checked) setIsAgreed(true);
              else setIsAgreed(false);
            }}
          />{" "}
          I agree that all choices made above are done by me and after I submit
          no changes can be made further.
          <br />
          <br />
          {isAgreed && <button onClick={confirmSubmit}>Submit</button>}
          <br />
          <br />
        </div>
      )}
    </>
  );
}

export default ConfirmRoom;