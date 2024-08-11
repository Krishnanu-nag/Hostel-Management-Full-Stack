import axios from "axios";
import MainLayout from "../layout/MainLayout";
import "./RoomBooked.css";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const baseURL = import.meta.env.VITE_BASE_URL;

function RoomBooked() {
  const [studentInfo, setStudentInfo] = useState({});
  const [message, setMessage] = useState("");
  const studentId = localStorage.getItem("studentId");
  const navigate = useNavigate();

  useEffect(() => {
    // Why use useEffect?
    // -------------------
    // The useEffect hook is used to perform side effects in a function component.
    // Side effects include things like data fetching, subscriptions, or manually changing the DOM.
    // If we place our data fetching logic outside of useEffect, it would execute on every render.
    // This would lead to the component trying to fetch data continuously, causing performance issues and potentially leading to infinite loops.

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
        }
      };

      // Fetch the student information when the component mounts or when the studentId changes
      fetchStudentInfo();
    } else {
      setMessage("Student ID not found. Please log in.");
    }
  }, [studentId]); // Dependency array: The effect only runs when `studentId` changes.

  // What happens if useEffect is not used?
  // --------------------------------------
  // Without useEffect, the fetchStudentInfo function would execute on every render,
  // even when it’s not necessary, leading to multiple API calls that could overwhelm
  // the server and lead to performance issues. It might also cause the UI to behave unexpectedly,
  // as the state would be updated more frequently than intended.

  function logout() {
    localStorage.removeItem("studentId");
    alert("You have been logged out.");
    navigate("/login"); // Redirect to the login page after logout
  }

  return (
    <MainLayout>
      <div id="roomBooked">
        <div className="centerdiv">
          {message ? (
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
