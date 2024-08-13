import "./AquamarineRoomPage.css";
import MainLayout from "../layout/MainLayout";
import { useEffect, useState } from "react";
import ConfirmRoom from "../components/ConfirmRoom";
import "../components/RoomLayout.css";
import Timer from "../components/Timer.jsx";
import axios from "axios";
import { Navigate } from "react-router-dom"; // Import Navigate from react-router-dom

// Access the base URL from the environment variables
const baseURL = import.meta.env.VITE_BASE_URL;

function AquamarineRoomPage() {

  const [isCheckRoom, setCheckRoom] = useState(false);
  const [selectedBlock, setSelectedBlock] = useState("");
  const [selectedFloor, setSelectedFloor] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");
  const [roomLayout, setRoomLayout] = useState(false);
  const [loader, setLoader] = useState("Loading data... Please Wait");
  const [occupiedRooms, setOccupiedRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // State for loading status
  const studentId = localStorage.getItem("studentId");

  const fetchOccupiedRooms = async () => {
    // Display initial loader message
    const loaderTimeout = setTimeout(() => {
      setLoader("Taking longer than usual... Please wait");
    }, 5000);

    try {
      setIsLoading(true); // Start loading
      // Make a POST request to the backend with selectedFloor and selectedBlock
      const response = await axios.post(`${baseURL}/occupied-rooms`, {
        selectedFloor,
        selectedBlock,
      });

      // Clear the timeout to prevent the message from changing after data is fetched
      clearTimeout(loaderTimeout);
      setLoader("Loading data... Please Wait"); // Restore the original message

      // Set the state with the received array of occupied rooms
      setOccupiedRooms(response.data);
      setRoomLayout(true);
      setCheckRoom(true);
      setLoader("Loading data... Please Wait");
    } catch (error) {
      // Log any error that occurs during the request
      console.error("Error fetching occupied rooms:", error);
    } finally {
      setIsLoading(false); // Stop loading
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
      const occupied = document.getElementById(`${roomNumber}`);
      if (occupied) {
        occupied.style.backgroundColor = "red"; // Color occupied rooms red
        const inputElement = occupied.previousElementSibling;
        if (inputElement) {
          inputElement.disabled = true; // Disable input for occupied rooms
        }
      }
    });
  }, [occupiedRooms]);

  if (!studentId) {
    return <Navigate to="/login-page" />; // Redirect to login if not signed in
  }

  return (
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
        <p className="accomodationInfo">** Each room is divided into two selectable blocks for double accomodation.<br/>You and your Room-mate should choose the same room,either of the blocks. </p>
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
          </form>
        </div>
        {roomLayout && <Timer />}
        <br />
        {isLoading ? (
          <p className="loader-fetching-room">{loader}</p> // Display loading text while data is being fetched
        ) : (
          <>
            {roomLayout && (
              <div id="aquamarineRoomLayout">
                <div id="aquamarineRoomSelect">
                  {(selectedBlock === "E"
                    ? [
                        "06",
                        "07",
                        "05",
                        "08",
                        "04",
                        "09",
                        "03",
                        "10",
                        "02",
                        "11",
                        "01",
                        "12",
                        "13",
                      ]
                    : [
                        "10",
                        "01",
                        "09",
                        "02",
                        "08",
                        "03",
                        "07",
                        "04",
                        "06",
                        "05",
                      ]
                  ).map((room) => (
                    <div key={room} className="room-block">
                      <label className="custom-radio left-half-label">
                        <input
                          value={`${room}.`}
                          type="radio"
                          name="option"
                          onChange={(e) => setSelectedRoom(e.target.value)}
                          disabled={occupiedRooms.includes(`${room}.`)} // Disable if occupied
                        />
                        <span
                          className="half-room left-half"
                          style={{
                            backgroundColor: occupiedRooms.includes(
                              `${room}.`
                            )
                              ? "red"
                              : "", // Color red if occupied
                          }}
                          id={`${room}.`}
                        >
                          <p className="room-number">{room}</p>
                        </span>
                      </label>
                      <label className="custom-radio right-half-label">
                        <input
                          value={`${room}:`}
                          type="radio"
                          name="option"
                          onChange={(e) => setSelectedRoom(e.target.value)}
                          disabled={occupiedRooms.includes(`${room}:`)} // Disable if occupied
                        />
                        <span
                          className="half-room right-half"
                          style={{
                            backgroundColor: occupiedRooms.includes(
                              `${room}:`
                            )
                              ? "red"
                              : "", // Color red if occupied
                          }}
                          id={`${room}:`}
                        >
                          <p className="room-number">{room}</p>
                        </span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {isCheckRoom && (
              <ConfirmRoom
                block={selectedBlock}
                floor={selectedFloor}
                room={selectedRoom}
              />
            )}
          </>
        )}
      </div>
    </MainLayout>
  );
}

export default AquamarineRoomPage;
