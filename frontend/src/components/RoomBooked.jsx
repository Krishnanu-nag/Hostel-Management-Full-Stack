import axios from "axios";
import MainLayout from "../layout/MainLayout";
import "./RoomBooked.css";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import logo from "../../public/ismlogo.jpg";

const baseURL = import.meta.env.VITE_BASE_URL;

function RoomBooked() {
  const [studentInfo, setStudentInfo] = useState({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const studentId = localStorage.getItem("studentId");
  const navigate = useNavigate();

  useEffect(() => {
    if (studentId) {
      const fetchStudentInfo = async () => {
        try {
          const response = await axios.post(`${baseURL}/find-student`, {
            studentId,
          });

          if (response.data === "RoomNotAllocated") {
            setMessage("Room not allocated yet.");
          } else {
            setStudentInfo(response.data);
            console.log("Student Info:", response.data); // Debug: Log the response data
          }
        } catch (error) {
          console.error("Error finding student:", error);
          setMessage("An error occurred while searching for the student.");
        } finally {
          setLoading(false);
        }
      };

      fetchStudentInfo();
    } else {
      setMessage("Please Sign In to know your alloted room.");
      setLoading(false);
    }
  }, [studentId]);

  function generatePDF() {
    const doc = new jsPDF();

    // Add IIT (ISM) logo to the PDF
    doc.addImage(logo, "PNG", 15, 10, 30, 30);

    // Add the title
    doc.setFontSize(18);
    doc.text("Room Allocation Details", 80, 20);

    // Prepare table data
    const tableData = [
      ["Student ID", studentId],
      ["Name", studentInfo.studentName || "N/A"], // Ensure that 'name' is not undefined
      ["Hostel", studentInfo.hostel],
      ["Selected Block", studentInfo.selectedBlock],
      ["Selected Floor", studentInfo.selectedFloor],
      ["Selected Room", studentInfo.selectedRoom],
    ];

    // Generate the table
    doc.autoTable({
      startY: 50,
      head: [["Field", "Details"]],
      body: tableData,
      theme: "grid",
      headStyles: { fillColor: [177, 4, 14] },
    });

    // Save the PDF
    doc.save(`${studentId}_RoomDetails.pdf`);
  }

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
                Dear {studentId} <br />
                <br />
                Room Booked Successfully !!!
              </h2>
              <br />
              <h2>Your Allotted Room No :</h2>
              <br />
              <h1>
                {studentInfo.selectedBlock}/{studentInfo.selectedFloor}/
                {studentInfo.selectedRoom}
              </h1>
              <br />
              <br />
              <button onClick={generatePDF}>Print Document</button>
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
