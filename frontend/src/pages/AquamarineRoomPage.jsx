import "./AquamarineRoomPage.css";
import MainLayout from "../layout/MainLayout";
import { useEffect, useState } from "react";
import ConfirmRoom from "../components/ConfirmRoom";
import "../components/RoomLayout.css";
import Timer from "../components/Timer.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoginPage from "./LoginPage.jsx";

// Access the base URL from the environment variables
const baseURL = import.meta.env.VITE_BASE_URL;

function AquamarineRoomPage() {
  const navigate = useNavigate();
  const [isCheckRoom, setCheckRoom] = useState(false);
  const [selectedBlock, setSelectedBlock] = useState("");
  const [selectedFloor, setSelectedFloor] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");
  const [roomLayout, setRoomLayout] = useState(false);
  const [occupiedRooms, setOccupiedRooms] = useState([]);
  const studentId = localStorage.getItem("studentId");
  const password = localStorage.getItem("password");

  const fetchOccupiedRooms = async () => {
    try {
      // Make a POST request to the backend with selectedFloor and selectedBlock
      const response = await axios.post(`${baseURL}/occupied-rooms`, {
        selectedFloor: selectedFloor,
        selectedBlock: selectedBlock,
      });

      // Set the state with the received array of occupied rooms
      setOccupiedRooms(response.data);
      setRoomLayout(true);
      setCheckRoom(true);
    } catch (error) {
      // Log any error that occurs during the request
      console.error("Error fetching occupied rooms:", error);
    }
  };

  useEffect(() => {
    if (selectedBlock && selectedFloor) {
      fetchOccupiedRooms();
    }
  }, [selectedBlock, selectedFloor]);

  useEffect(() => {
    // Reset previous room styles and states
    document.querySelectorAll(".checkmark").forEach((span) => {
      span.style.backgroundColor = ""; // Clear previous background color
      const inputElement = span.previousElementSibling;
      if (inputElement) {
        inputElement.disabled = false; // Enable input
      }
    });

    // Apply new styles for occupied rooms
    occupiedRooms.forEach((roomNumber) => {
      let occupied;
      if (roomNumber !== "10") {
        occupied = document.getElementById(`${roomNumber}`);
      } else {
        occupied = document.getElementById(`10`);
      }

      if (occupied) {
        occupied.style.backgroundColor = "red";
        const inputElement = occupied.previousElementSibling;
        if (inputElement) {
          inputElement.disabled = true; // Disable input
        }
      }
    });
  }, [occupiedRooms]);

  return (
    <>
      {studentId && password ? (
        <MainLayout>
          <div id="aquamarineRoomPage">
            <div id="legend">
              <div id="vacant" className="box"></div>
              <label>Vacant</label>
              <br />
              <div id="occupied" className="box"></div>
              <label>Occupied</label>
              <br />
              <div id="selected" className="box"></div>
              <label>Selected</label>
              <br />
            </div>
            <div className="form-container">
              <form action="">
                <label htmlFor="block">Choose Block : </label>
                <select
                  name="block"
                  id="block"
                  onChange={(e) => {
                    setSelectedBlock(e.target.value);
                    setSelectedRoom("");
                  }}
                >
                  <option value="" hidden>
                    Select
                  </option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="P">P</option>
                  <option value="N">N</option>
                  <option value="E">E</option>
                  <option value="G">G</option>
                  <option value="J">J</option>
                </select>
                <br />
                <br />
                <label htmlFor="floor">Choose Floor : </label>
                <select
                  name="floor"
                  id="floor"
                  onChange={(e) => {
                    setSelectedFloor(e.target.value);
                    setSelectedRoom("");
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
                {/* <button
                  onClick={async (e) => {
                    e.preventDefault();
                    if(selectedBlock==""||selectedFloor=="") {
                      alert("Please Select Block / Floor !! ");
                    }
                  }}
                >
                  Check Available Rooms
                </button> */}
              </form>
            </div>
            {roomLayout && <Timer />}
            <br />
            {roomLayout && (
              <div id="aquamarineRoomLayout">
                <div
                  id="aquamarineRoomSelect"
                  onChange={(e) => {
                    setSelectedRoom(e.target.value);
                  }}
                >
                  {/* Define your room layout here with radio buttons */}
                  {["01", "02", "03", "04", "05", "10", "09", "08", "07", "6"].map((room) => (
                    <label key={room} className="custom-radio">
                      <input value={room} type="radio" name="option" />
                      <span id={room} className="checkmark">
                        <p className="centerdiv">{room}</p>
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}
            <br />
            <br />
            {isCheckRoom && (
              <ConfirmRoom block={selectedBlock} floor={selectedFloor} room={selectedRoom} />
            )}
          </div>
        </MainLayout>
      ) : (
        <LoginPage/>
      )}
    </>
  );
}

export default AquamarineRoomPage;