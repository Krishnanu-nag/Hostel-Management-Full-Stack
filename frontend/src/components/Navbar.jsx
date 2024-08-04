import "./Navbar.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
function Navbar() {
  const navigate = useNavigate()
  function logOut() {
    localStorage.removeItem("studentId")
    localStorage.removeItem("password")
    navigate("/login-page")
  }
  return (
    <>
      <header>
        <div className="logobar">
          <Link to="/home-page">
            <img className="logo" src="./logo.png" />
          </Link>
        </div>
        <div className="navbar">
          <NavLink to="/home-page">
            <span className="dropdown">
              <button id="home-btn" className="dropbtn">
                Home◽
              </button>
            </span>
          </NavLink>
          <span className="dropdown">
            <button className="dropbtn">Boys Hostel ⮟</button>
            <div className="dropdown-content">
              <Link to="/aquamarine-page" id="aquamarine">
                Aquamrine
              </Link>
              <Link to="/aquamarine-page" id="Jasper">
                Jasper
              </Link>
              <Link to="/aquamarine-page" id="Amber">
                Amber
              </Link>
            </div>
          </span>
          <span className="dropdown">
            <button className="dropbtn">Girls Hostel ⮟</button>
            <div className="dropdown-content">
              <Link to="/aquamarine-page" id="ruby">
                Ruby
              </Link>
              <Link to="/aquamarine-page" id="newRosaline">
                New Rosaline
              </Link>
              <Link to="/aquamarine-page" id="oldRosaline">
                Old Rosaline
              </Link>
            </div>
          </span>
          <span className="dropdown">
            <button className="dropbtn">{localStorage.getItem("studentId")} ⮟</button>
            <div className="dropdown-content">
             
                <a onClick={logOut} id="home-btn" className="dropbtn">
                  Log-out◽
                </a>
              
            </div>
          </span>

        </div>
      </header>
    </>
  );
}
export default Navbar;
