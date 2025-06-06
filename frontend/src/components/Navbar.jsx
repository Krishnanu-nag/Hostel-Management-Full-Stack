import "./Navbar.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const navigate = useNavigate();

  function logOut() {
    localStorage.removeItem("studentId");
    navigate("/login-page");
  }

  const studentId = localStorage.getItem("studentId");

  const handleSignInClick = () => {
    if (!studentId) {
      navigate("/login-page");
    }
  };

  return (
    <>
      <header>
        <div className="logobar">
          <Link to="/home-page">
            <img className="logo" src="/logo.png" alt="Logo" />
          </Link>
        </div>
        <div className="navbar">
          <NavLink to="/home-page">
            <span className="dropdown">
              <a id="home-btn" className="dropbtn">
                Home◽
              </a>
            </span>
          </NavLink>
          <NavLink to="/find-room-page">
            <span className="dropdown">
              <a id="search-room-btn" className="dropbtn">
                Find◽
              </a>
            </span>
          </NavLink>
          <span className="dropdown">
            <a className="dropbtn">Book Hostel ▼</a>
            <div className="dropdown-content">
              <span className="dropdown">
                <a
                  className="sub-dropbtn"
                  style={{ backgroundColor: "#b11e1e", cursor: "default" }}
                >
                  Boys Hostel
                </a>
                <div className="sub-dropdown-content">
                  <Link to="/aquamarine-page" id="aquamarine">
                    Aquamarine
                  </Link>
                  {/* <Link to="/aquamarine-page" id="Jasper">
                    Jasper
                  </Link>
                  <Link to="/aquamarine-page" id="Amber">
                    Amber
                  </Link> */}
                </div>
              </span>
              <span className="dropdown">
                <a
                  className="sub-dropbtn"
                  style={{ backgroundColor: "#b11e1e", cursor: "default" }}
                >
                  Girls Hostel
                </a>
                <div className="sub-dropdown-content">
                  {/* <Link to="/aquamarine-page" id="ruby">
                    Ruby
                  </Link>
                  <Link to="/aquamarine-page" id="newRosaline">
                    New Rosaline
                  </Link> */}
                  <Link to="/aquamarine-page" id="oldRosaline">
                    Old Rosaline
                    <br />
                    (Soon)
                  </Link>
                </div>
              </span>
            </div>
          </span>
          <span className="dropdown">
            <a className="dropbtn" onClick={handleSignInClick}>
              {studentId ? studentId : "SignIn"} ▼
            </a>
            {studentId && (
              <div className="dropdown-content">
                <a onClick={logOut} id="home-btn" className="dropbtn">
                  LogOut
                </a>
              </div>
            )}
          </span>
        </div>
        {/* <div className="copyright">
          <p>Developed by Krishnanu Nag &nbsp;22JE0500</p>
        </div> */}
      </header>
    </>
  );
}

export default Navbar;
