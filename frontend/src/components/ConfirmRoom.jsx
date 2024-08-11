import { useState } from "react";
import "./ConfirmRoom.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Access the base URL from the environment variables
const baseURL = import.meta.env.VITE_BASE_URL;

function ConfirmRoom(data) {
  const navigate = useNavigate();
  const [buttonText, setButtonText] = useState("Submit");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const confirmSubmit = async (e) => {
    e.preventDefault();
    setButtonText("Submitting...");
    setIsButtonDisabled(true);

    if (studentId !== "Guest") {
      try {
        const result = await axios.post(`${baseURL}/aquamarine-room-page`, {
          selectedBlock,
          selectedFloor,
          selectedRoom,
          studentId,
        });

        if (result.data === "AllocationSuccess") {
          alert(
            `Success! Your allotted room is ${data.block}/${data.floor}/${data.room}`
          );
          navigate("/room-booked-page");
        } else if (result.data === "AllocationExists") {
          alert("Room already allocated to this student");
          navigate("/room-booked-page");
        } else if (result.data === "RoomAlreadyAllocated") {
          alert(
            "Room is already allocated to someone else. Please choose a new room."
          );
          setButtonText("Submit");
          setIsButtonDisabled(false);
          window.location.reload();
        } else {
          alert("Unknown Error Occured");
        }
      } catch (err) {
        console.error("Network issue:", err);
        setButtonText("Submit");
        setIsButtonDisabled(false);
      }
    } else {
      alert(
        `Success! ${localStorage.getItem("studentId")} your allotted room is ${
          data.block
        }/${data.floor}/${
          data.room
        }. Since you are a Guest, the allocated room will not be registered in the database.`
      );
      navigate("/thanks-page");
      setButtonText("Submit");
      setIsButtonDisabled(false);
    }
  };

  const selectedBlock = data.block;
  const selectedFloor = data.floor;
  const selectedRoom = data.room;
  const studentId = localStorage.getItem("studentId");
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
          I agree that all choices made above are done by me and after I submit
          no changes can be made further.
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
