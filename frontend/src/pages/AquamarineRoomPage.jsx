import "./AquamarineRoomPage.css";
import MainLayout from "../layout/MainLayout";
import { useState } from "react";
import ConfirmRoom from "../components/ConfirmRoom";
import "../components/RoomLayout.css";
import Timer from "../components/Timer.jsx";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";



function AquamarineRoomPage() {
  const navigate=useNavigate();
  let [ischeckRoom, setcheckRoom] = useState(false);
  let [selectedBlock, setSelectedBlock] = useState("");
  let [selectedFloor, setSelectedFloor] = useState("");
  let [selectedRoom, setSelectedRoom] = useState("");
  let [roomLayout, setRoomLayout] = useState(false);
  let studentId=localStorage.getItem("studentId")

  return (
    <>
      <MainLayout>
        <div id="aquamarineRoomPage">
          <div className="form-container">
            <form action="">
              <label htmlFor="block">Choose Block : </label>
              <select
                name="block"
                id="block"
                onChange={(e) => {
                  setSelectedBlock(e.target.value);
                }}
              >
                <option value="" hidden>
                  Select
                </option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="E">E</option>
                <option value="G">G</option>
                <option value="J">J</option>
              </select>
              <br />
              <br />
              <label htmlFor="floor">Choose Floor : </label>
              <select
                name="block"
                id="block"
                onChange={(e) => {
                  setSelectedFloor(e.target.value);
                }}
              >
                <option value="" hidden>
                  Select
                </option>
                <option value="G">G</option>
                <option value="01">1</option>
                <option value="02">2</option>
                <option value="03">3</option>
                <option value="04">4</option>
                <option value="05">5</option>
                <option value="06">6</option>
                <option value="07">7</option>
                <option value="08">8</option>
                <option value="09">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="13">13</option>
              </select>
              <br />
              <br />
              <button
                onClick={async (e) => {
                  e.preventDefault();
                  if (selectedBlock != "" && selectedFloor != "") {
                    await axios.post(
                      "http://localhost:3000/aquamarine-room-page-check-alloted?",
                      { studentId }
                    )
                    .then(result=>{
                      if(result.data==="AlreadyAlloted") {alert(`${localStorage.getItem("studentId")} has already been Alloted room`);
                      navigate("/home-page")}
                      else if(result.data==="NotYetAlloted"){setRoomLayout(true);
                        setcheckRoom(true);}
                    })
                    
                  } else {
                    alert("Please Select Block / Floor !! ");
                  }
                }}
              >
                Check Available Rooms
              </button>
            </form>
          </div>
          {roomLayout === true && <Timer />}
          <br />
          {roomLayout === true && (
            <div id="aquamarineRoomLayout">
              <div
                id="aquamarineRoomSelect"
                onChange={(e) => {
                  setSelectedRoom(e.target.value);
                }}
              >
                <label className="custom-radio">
                  <input value="01" type="radio" name="option" />
                  <span className="checkmark">
                    <p className="centerdiv">1</p>
                  </span>
                </label>

                <label className="custom-radio">
                  <input
                    value="02"
                    selected
                    type="radio"
                    name="option"
                    disabled
                  />
                  <span
                    className="checkmark"
                    style={{ backgroundColor: "#FF0000" }}
                  >
                    <p className="centerdiv">2</p>
                  </span>
                </label>

                <label className="custom-radio">
                  <input value="03" type="radio" name="option" />
                  <span className="checkmark">
                    <p className="centerdiv">3</p>
                  </span>
                </label>

                <label className="custom-radio">
                  <input value="04" selected type="radio" name="option" />
                  <span className="checkmark">
                    <p className="centerdiv">4</p>
                  </span>
                </label>

                <label className="custom-radio">
                  <input value="05" selected type="radio" name="option" />
                  <span className="checkmark">
                    <p className="centerdiv">5</p>
                  </span>
                </label>

                <br />
                <br />

                <label className="custom-radio">
                  <input value="10" type="radio" name="option" />
                  <span className="checkmark">
                    <p className="centerdiv">10</p>
                  </span>
                </label>

                <label className="custom-radio">
                  <input value="09" selected type="radio" name="option" />
                  <span className="checkmark">
                    <p className="centerdiv">9</p>
                  </span>
                </label>

                <label className="custom-radio">
                  <input value="08" type="radio" name="option" />
                  <span className="checkmark">
                    <p className="centerdiv">8</p>
                  </span>
                </label>

                <label className="custom-radio">
                  <input value="07" selected type="radio" name="option" />
                  <span className="checkmark">
                    <p className="centerdiv">7</p>
                  </span>
                </label>

                <label className="custom-radio">
                  <input value="06" selected type="radio" name="option" />
                  <span className="checkmark">
                    <p className="centerdiv">6</p>
                  </span>
                </label>
              </div>
            </div>
          )}
          <br />
          <br />
          {ischeckRoom && (
            <ConfirmRoom
              block={selectedBlock}
              floor={selectedFloor}
              room={selectedRoom}
            />
          )}
        </div>
      </MainLayout>
    </>
  );
}
export default AquamarineRoomPage;
