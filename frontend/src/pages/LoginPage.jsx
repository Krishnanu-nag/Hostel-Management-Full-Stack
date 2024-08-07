import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

// Access the base URL from the environment variables
const baseURL = import.meta.env.VITE_BASE_URL;

function LoginPage() {
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const [newLogin, setNewLogin] = useState(false);   // Removes old login info saved on local storage if previously not removed by logging out 
  const [buttonText, setButtonText] = useState('Login');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const navigate = useNavigate();

  if (!newLogin){
    localStorage.removeItem("studentId");
    localStorage.removeItem("password");
    localStorage.removeItem("selectedBlock");
    localStorage.removeItem("selectedFloor");
    localStorage.removeItem("selectedRoom");
  };

  function guestLogin(){
    localStorage.setItem("studentId","Admin");
    localStorage.setItem("password","guest1234");
  }
  
  let submit = async (e) => {
    if (studentId !== "" && password !== "") {
      e.preventDefault();
      setButtonText('Verifying...');
      setIsButtonDisabled(true);

      setNewLogin(true);  // Old account details get deleted and new ones get stored
      localStorage.setItem('studentId', studentId);
      localStorage.setItem('password', password);

      await axios.post(`${baseURL}/login-page`, {
          studentId,
          password,
        })
        .then((result) => {
          if (result.data === "Success") {
            alert(`Welcome ${studentId}`);
            navigate("/home-page");
          } else if (result.data === "Failed") {
            alert("Invalid Password");
            window.location.reload(false); // Refreshes page for invalid credentials
          } else if (result.data === "Invalid") {
            alert("User not registered. Please Register !!!");
            navigate("/register-page");
          }
        })
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {
          setButtonText('Login');
          setIsButtonDisabled(false);
        });
    }
    else {
      alert("Please enter credentials");
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  
  return (
    <>
      <div className="centerdiv" id="loginPage">
        <h1>Student Login</h1>
        <img src="./student-login.svg" alt="student logo" />
        <form className="loginForm">
          <input
            type="text"
            placeholder="Student ID: 22JEXXXX"
            onChange={(e) => setStudentId(e.target.value.toUpperCase())}
          />
          <br />
          <br />
          <input
            className="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          /><br/>
          <a className="passwordVisbility" type="button" onClick={togglePassword}>
            {showPassword ? "Hide" : "Show"}
          </a>
          <br />
        </form>
        <button type="submit" onClick={submit} disabled={isButtonDisabled}>
          {buttonText}
        </button><br/><br/>
        <Link to="/register-page">Not registered?</Link><br/><br/>
        <Link to="/home-page" onClick={guestLogin}>Guest User <br/>(No credentials Required)</Link>
      </div>
    </>
  );
}

export default LoginPage;
