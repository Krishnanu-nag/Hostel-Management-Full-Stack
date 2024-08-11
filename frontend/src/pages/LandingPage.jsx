import { Link } from "react-router-dom";

function LandingPage() {
  // mouse hover effect on login button but iit ism gets styled
  function colorchangeEnter() {
    document.querySelector(".title").style.color = "#4040FF";
  }
  function colorchangeOut() {
    document.querySelector(".title").style.color = "black";
  }
  
   //IIFE called

  (function (){
    localStorage.removeItem("studentId");            
  })();

  return (
    <>
      <div className="centerdiv" id="landingPage">
        <img src="./ismlogo.jpg" />
        <p className="title">IIT ISM Hostel Management Portal</p>
        <Link to ="/home-page">
        <button
            className="login_btn"
            onMouseEnter={colorchangeEnter}
            onMouseLeave={() => {
              colorchangeOut();
            }}
          >
            Proceed to Home Page
          </button></Link><br/><br/>
        <Link to="/register-page">
          <button
            className="login_btn"
            onMouseEnter={colorchangeEnter}
            onMouseLeave={() => {
              colorchangeOut();
            }}
          >
            Proceed to Log In
          </button>
          
        </Link>
      </div>
    </>
  );
}
export default LandingPage;
