import MainLayout from "../layout/MainLayout";
import "./AquamarinePage.css";
import { Link } from "react-router-dom";

function AquamarinePage() {
  return (
    <>
      <MainLayout>
        <img id="aqua-img" src="./aquamarine.png" />
        <div id="aquamarinePage">
          <h1>Aquamarine Hostel</h1>
          <div id="aquaBookRoom">
            <Link to="/aquamarine-room-page">
            <button>Proceed to book your room</button></Link>
          </div>
          <div className="aquaContent">
           
            <h3>A Home Away from Home </h3>
            <br />
            <p>
              The Aquamarine Hostel at the Indian Institute of Technology
              (Indian School of Mines), Dhanbad, stands as a symbol of the
              institute’s commitment to providing a holistic and enriching
              experience for its residents. Nestled within the sprawling campus
              of IIT ISM, Aquamarine Hostel is designed to meet the diverse
              needs of students, fostering an environment conducive to academic
              excellence, personal growth, and social engagement.
            </p>
            <br />
            <h3>Accommodation and Amenities</h3>
            <br />
            <p>
              Aquamarine Hostel offers well-furnished rooms equipped with
              essential furniture, ensuring a comfortable living space. Common
              areas with seating arrangements, televisions, and recreational
              facilities promote social interaction and community building.
            </p>
            <br />
            <h3>Dining Facilities</h3>
            <br />
            <p>
              The hostel mess serves nutritious and delicious meals, catering to
              diverse tastes and dietary requirements. Hygiene and cleanliness
              are prioritized, ensuring a pleasant and safe dining experience.
              Special meals during festivals add a touch of home to hostel life.
            </p>
            <br />
            <h3>Extracurricular Activities and Recreation</h3>
            <br />
            <p>
              The hostel encourages participation in extracurricular activities
              and sports, with facilities for indoor games like table tennis and
              outdoor sports such as basketball and volleyball. Regular
              tournaments and matches foster healthy competition and teamwork.
            </p>
            <br />
            <h3>Health and Wellness</h3>
            <br />
            <p>
              Proximity to the campus medical center ensures that medical
              assistance is readily available. Regular health check-ups and
              wellness programs promote physical and mental health. Yoga and
              meditation sessions help students manage stress and maintain a
              balanced lifestyle.
            </p>
            <br />
            <h3>Community and Culture</h3>
            <br />
            <p>
              The hostel is known for its vibrant and inclusive community.
              Cultural events, festivals, and social gatherings celebrate the
              diverse backgrounds and talents of the students, fostering a sense
              of unity and belonging.
            </p>
            <br />
            <h3>Safety and Security</h3>
            <br />
            <p>
              The hostel premises are equipped with surveillance cameras and
              monitored by security personnel. Access is restricted to residents
              and authorized personnel, ensuring a safe and secure environment.
            </p>
            <br />
            <h3>Sustainability Initiatives</h3>
            <br />
            <p>
              The hostel promotes eco-friendly practices, including waste
              segregation, recycling programs, and energy conservation measures.
              Students participate in green initiatives, contributing to
              environmental conservation and instilling a sense of
              responsibility.
            </p>
            <br />
          </div>
         
        </div>
      </MainLayout>
    </>
  );
}
export default AquamarinePage;
