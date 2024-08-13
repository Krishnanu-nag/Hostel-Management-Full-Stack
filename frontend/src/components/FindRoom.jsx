import "./FindRoom.css";
import { useState } from "react";
import axios from "axios";

// Access the base URL from the environment variables
const baseURL = import.meta.env.VITE_BASE_URL;

function FindStudent() {
  const [studentId, setStudentId] = useState("");
  const [studentInfo, setStudentInfo] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setStudentInfo(null);

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
      setLoading(false);
    }
  };

  return (
    <div className="find-student-container">
      <h2>Find Student's Room </h2>
      <form >
        <input
          type="text"
          placeholder="Enter Student ID"
          value={studentId}
          onChange={(e) => setStudentId((e.target.value.toUpperCase()).trim())}
          required
        />
      </form><br/>
      <button onClick={handleSearch} type="submit" disabled={loading}>
          {loading ? "Searching..." : "Find Room"}
        </button>

      {message && <p className="message">{message}</p>}

      {studentInfo && (
        <div className="student-info">
          <h3>Student Room Information:</h3>
          <p><strong>Hostel:</strong> {studentInfo.hostel}</p>
          <p><strong>Block:</strong> {studentInfo.selectedBlock}</p>
          <p><strong>Floor:</strong> {studentInfo.selectedFloor}</p>
          <p><strong>Room:</strong> {studentInfo.selectedRoom}</p>
        </div>
      )}
    </div>
  );
}

export default FindStudent;
