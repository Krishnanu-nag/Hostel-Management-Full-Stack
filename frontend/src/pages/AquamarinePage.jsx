import MainLayout from "../layout/MainLayout";
import "./AquamarinePage.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

// Access the base URL from the environment variables
const baseURL = import.meta.env.VITE_BASE_URL;

function AquamarinePage() {
  const navigate = useNavigate(); // Move this to the top level of the component
  const [buttonText, setButtonText] = useState("Proceed to book your room");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  async function checkStudent() {
    const studentId = localStorage.getItem("studentId"); // Retrieve studentId from localStorage

    setButtonText("Checking...");
    setIsButtonDisabled(true);

    if (studentId === "Guest") {
      navigate("/aquamarine-room-page");
    } else if (!studentId) {
      navigate("/login-page");
    } else {
      try {
        const result = await axios.post(
          `${baseURL}/aquamarine-room-page-check-alloted`,
          { studentId }
        );

        if (result.data === "AlreadyAlloted") {
          alert(`${studentId} has already been allotted a room`);
          navigate("/room-booked-page");
        } else {
          navigate("/aquamarine-room-page");
        }
      } catch (error) {
        console.error("Some error occurred:", error); // Improved error logging
      }
    }
  }

  return (
    <MainLayout>
      <img id="aqua-img" src="/aquamarine.jpeg" alt="Aquamarine Hostel" />
      <div id="aquamarinePage">
        <h1>Aquamarine Hostel</h1>
        <div id="aquaBookRoom">
          <button onClick={checkStudent} disabled={isButtonDisabled}>
            {buttonText}
          </button>
        </div>
        <div className="aquaContent">
          <div className="contentBlock slideInLeft">
            <h3>A Home Away from Home</h3>
            <p>
              The Aquamarine Hostel at the Indian Institute of Technology
              (Indian School of Mines), Dhanbad, stands as a symbol of the
              institute’s commitment to providing a holistic and enriching
              experience for its residents. Nestled within the sprawling campus
              of IIT ISM, Aquamarine Hostel is designed to meet the diverse
              needs of students, fostering an environment conducive to academic
              excellence, personal growth, and social engagement.
            </p>
          </div>
          <div className="contentBlock slideInRight">
            <h3>Accommodation and Amenities</h3>
            <p>
              Aquamarine Hostel offers well-furnished rooms equipped with
              essential furniture, ensuring a comfortable living space. Common
              areas with seating arrangements, televisions, and recreational
              facilities promote social interaction and community building.
            </p>
          </div>
          <div className="contentBlock slideInLeft">
            <h3>Dining Facilities</h3>
            <p>
              The hostel mess serves nutritious and delicious meals, catering to
              diverse tastes and dietary requirements. Hygiene and cleanliness
              are prioritized, ensuring a pleasant and safe dining experience.
              Special meals during festivals add a touch of home to hostel life.
            </p>
          </div>
          <div className="contentBlock slideInRight">
            <h3>Extracurricular Activities and Recreation</h3>
            <p>
              The hostel encourages participation in extracurricular activities
              and sports, with facilities for indoor games like table tennis and
              outdoor sports such as basketball and volleyball. Regular
              tournaments and matches foster healthy competition and teamwork.
            </p>
          </div>
          <div className="contentBlock slideInLeft">
            <h3>Health and Wellness</h3>
            <p>
              Proximity to the campus medical center ensures that medical
              assistance is readily available. Regular health check-ups and
              wellness programs promote physical and mental health. Yoga and
              meditation sessions help students manage stress and maintain a
              balanced lifestyle.
            </p>
          </div>
          <div className="contentBlock slideInRight">
            <h3>Community and Culture</h3>
            <p>
              The hostel is known for its vibrant and inclusive community.
              Cultural events, festivals, and social gatherings celebrate the
              diverse backgrounds and talents of the students, fostering a sense
              of unity and belonging.
            </p>
          </div>
          <div className="contentBlock slideInLeft">
            <h3>Safety and Security</h3>
            <p>
              The hostel premises are equipped with surveillance cameras and
              monitored by security personnel. Access is restricted to residents
              and authorized personnel, ensuring a safe and secure environment.
            </p>
          </div>
          <div className="contentBlock slideInRight">
            <h3>Sustainability Initiatives</h3>
            <p>
              The hostel promotes eco-friendly practices, including waste
              segregation, recycling programs, and energy conservation measures.
              Students participate in green initiatives, contributing to
              environmental conservation and instilling a sense of
              responsibility.
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default AquamarinePage;
