import axios from "axios";
import MainLayout from "../layout/MainLayout";
import "./RoomBooked.css";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const baseURL = import.meta.env.VITE_BASE_URL;
function RoomBooked() {
  const [studentInfo, setStudentInfo] = useState({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true); // Add a loading state
  const studentId = localStorage.getItem("studentId");
  const navigate = useNavigate();

  useEffect(() => {
    if (studentId) {
      const fetchStudentInfo = async () => {
        try {
          const response = await axios.post(`${baseURL}/find-student`, { studentId });
          if (response.data === "RoomNotAllocated") {
            setMessage("Room not allocated yet.");
          } else {
            setStudentInfo(response.data);
          }
        } catch (error) {
          console.error("Error finding student:", error);
          setMessage("An error occurred while searching for the student.");
        } finally {
          setLoading(false); // Set loading to false once the data is fetched
        }
      };

      fetchStudentInfo();
    } else {
      setMessage("Please Sign In to know your alloted room.");
      setLoading(false); // Set loading to false if no studentId is found
    }
  }, [studentId]);

  function logout() {
    localStorage.removeItem("studentId");
    alert("You have been logged out.");
    navigate("/login-page");
  }

  return (
    <MainLayout>
      <div id="roomBooked">
        <div className="centerdiv">
          {loading ? (
            <h2>Fetching data, please wait...</h2>
          ) : message ? (
            <h2>{message}</h2>
          ) : (
            <>
              <h2>
                Dear {studentId} <br /><br />
                Room Booked Successfully !!!
              </h2>
              <br />
              <h2>Your Allotted Room No :</h2>
              <br />
              <h1>
                {studentInfo.selectedBlock}/{studentInfo.selectedFloor}/{studentInfo.selectedRoom}
              </h1>
              <br />
              <br />
              <Link to="/thanks-page">
                <button onClick={logout}>Click here to Logout</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </MainLayout>
  );
}

export default RoomBooked;
