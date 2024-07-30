import "./Navbar.css";
import { Link,NavLink } from "react-router-dom";
function Navbar() {
  return (
    <>
      <header>
        <div className="logobar">
          <Link to="/home-page">
            <img className= "logo" src="./logo.png" />
          </Link>
          
        </div>
        <div className="navbar">
          <NavLink to="/home-page">
          <span className="dropdown">
            <button id="home-btn"className="dropbtn">
              Home ⮟
            </button></span>
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
        </div>
      </header>
    </>
  );
}
export default Navbar;
