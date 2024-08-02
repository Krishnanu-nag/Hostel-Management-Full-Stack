import MainLayout from "../layout/MainLayout";
import "./RoomBooked.css";
import { Link } from "react-router-dom";
function RoomBooked() {
 
    function logout() {
    localStorage.removeItem("studentId");
    localStorage.removeItem("password");
    localStorage.removeItem("selectedBlock");
    localStorage.removeItem("selectedFloor");
    localStorage.removeItem("selectedRoom");
    alert("You have been logged out.");
  }

  return (
    <>
      <MainLayout>
        <div id="roomBooked">
          <div className="centerdiv">
            <h2>Dear {localStorage.getItem('studentId')}  <br/><br/>Room Booked Successfully !!!</h2>
            <br />
            <h2>Your Alloted Room No :<br/></h2><br/> <h1> {localStorage.getItem('selectedBlock')}/{localStorage.getItem('selectedFloor')}/{localStorage.getItem('selectedRoom')}</h1>
            <br/>
            <br/>
            <Link to="/thanks-page">
              <button onClick={logout}>Click here to Logout</button>
            </Link>
          </div>
        </div>
      </MainLayout>
    </>
  );
}
export default RoomBooked;
