import { useState } from "react";
import "./ConfirmRoom.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";








function ConfirmRoom(data) {
  const navigate=useNavigate();

  
    let confirmSubmit = async (e) => {
      e.preventDefault();
      await axios
        .post("http://localhost:3000/aquamarine-room-page", {
          selectedBlock,
          selectedFloor,
          selectedRoom,
        })
        .then((result) => {
          if (result.data === "AllocationSuccess"){alert(`Success your alloted room is ${data.block}/${data.floor}/${data.room}`),navigate("/room-booked-page")}
           else {
            alert("Allocation Failed");
          }
        })
        .catch((err) => {console.log("Newtwork issue"),console.log(err.response.data)});
    };
  const selectedBlock=data.block
  const selectedFloor=data.floor
  const selectedRoom=data.room
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
      {data.room != "" && (
        <div className="confirmation">
          <input
            type="checkbox"
            onChange={(e) => {
              if (e.target.checked) setIsAgreed(true);
              else setIsAgreed(false);
            }}
          />{" "}
          I agree that All choices made above are done by me and after I submit
          no changes can be made furthur.
          <br />
          <br />
          {isAgreed === true && <button onClick={confirmSubmit}>Submit</button>}
          
          <br />
          <br />
        </div>
      )}
    </>
  );
}
export default ConfirmRoom;
