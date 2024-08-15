import "./FindRoom.css";
import { useState } from "react";
import axios from "axios";
const baseURL = import.meta.env.VITE_BASE_URL;

function FindStudent() {
  const [studentId, setStudentId] = useState("");
  const [studentName, setStudentName] = useState("");
  const [studentInfo, setStudentInfo] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [nameSuggestions, setNameSuggestions] = useState([]); // To store name suggestions
  const [idSuggestions, setIdSuggestions] = useState([]); // To store ID suggestions

  // Fetch name suggestions as the user types in the student name input
  const handleNameChange = async (e) => {
    const name = e.target.value;
    setStudentName(name.toUpperCase().trimStart());

    // Clear ID input and suggestions when typing name
    setStudentId("");
    setIdSuggestions([]);
    setStudentInfo(null); // Clear student info

    if (name.length > 1) {
      try {
        const response = await axios.get(`${baseURL}/name-suggestions`, {
          params: { name },
        });
        setNameSuggestions(response.data);
      } catch (error) {
        console.error("Error fetching name suggestions:", error);
      }
    } else {
      setNameSuggestions([]); // Clear suggestions if input is too short
    }
  };

  // Fetch ID suggestions as the user types in the student ID input
  const handleIdChange = async (e) => {
    const id = e.target.value;
    setStudentId(id.toUpperCase().trim());

    // Clear name input and suggestions when typing ID
    setStudentName("");
    setNameSuggestions([]);
    setStudentInfo(null); // Clear student info

    if (id.length > 1) {
      try {
        const response = await axios.get(`${baseURL}/id-suggestions`, {
          params: { id },
        });
        setIdSuggestions(response.data);
      } catch (error) {
        console.error("Error fetching ID suggestions:", error);
      }
    } else {
      setIdSuggestions([]); // Clear suggestions if input is too short
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setStudentInfo(null);

    try {
      const response = await axios.post(`${baseURL}/find-student`, { studentId, studentName });
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

  // Function to select a name from suggestions and clear the suggestions list
  const handleNameSelect = (suggestion) => {
    setStudentName(suggestion);
    setNameSuggestions([]); // Clear suggestions after selecting
    setStudentInfo(null); // Clear student info
  };

  // Function to select an ID from suggestions and clear the suggestions list
  const handleIdSelect = (suggestion) => {
    setStudentId(suggestion);
    setIdSuggestions([]); // Clear suggestions after selecting
    setStudentInfo(null); // Clear student info
  };

  return (
    <div className="find-student-container">
      <h2>Find Student's Room</h2>
      <form>
        <p>**For student name, there should be only one blank space between the first, middle, and last names.</p>
        <input
          type="text"
          placeholder="Enter Student Name"
          value={studentName}
          onChange={handleNameChange}
        />
        {nameSuggestions.length > 0 && (
          <ul className="suggestions-list">
            {nameSuggestions.map((suggestion, index) => (
              <li key={index} onClick={() => handleNameSelect(suggestion)}>
                {suggestion}
              </li>
            ))}
          </ul>
        )}
        <h3>Or</h3>
        <input
          type="text"
          placeholder="Enter Student ID"
          value={studentId}
          onChange={handleIdChange}
        />
        {idSuggestions.length > 0 && (
          <ul className="suggestions-list">
            {idSuggestions.map((suggestion, index) => (
              <li key={index} onClick={() => handleIdSelect(suggestion)}>
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </form>
      <br/>
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
