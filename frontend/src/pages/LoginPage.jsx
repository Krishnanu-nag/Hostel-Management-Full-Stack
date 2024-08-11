import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

// Access the base URL from the environment variables
const baseURL = import.meta.env.VITE_BASE_URL;

function LoginPage() {
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const [newLogin, setNewLogin] = useState(false);  // Tracks if a new login attempt is made
  const [buttonText, setButtonText] = useState('Login');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Clear local storage if it's not a new login attempt
  if (!newLogin) {
    localStorage.removeItem("studentId");
    localStorage.removeItem("password");
    localStorage.removeItem("selectedBlock");
    localStorage.removeItem("selectedFloor");
    localStorage.removeItem("selectedRoom");
  }

  const guestLogin = () => {
    localStorage.setItem("studentId", "Admin");
    localStorage.setItem("password", "guest1234");
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const submit = async (e) => {
    e.preventDefault();
    if (studentId && password) {
      setButtonText('Verifying...');
      setIsButtonDisabled(true);

      setNewLogin(true);  // Old account details get deleted and new ones get stored
      localStorage.setItem('studentId', studentId);
      localStorage.setItem('password', password);

      try {
        const result = await axios.post(`${baseURL}/login-page`, {
          studentId,
          password,
        });

        if (result.data === "Success") {
          alert(`Welcome ${studentId}`);
          navigate("/home-page");
        } else if (result.data === "Failed") {
          alert("Invalid Password");
          // window.location.reload(false); // Refreshes page for invalid credentials
        } else if (result.data === "Invalid") {
          alert("User not registered. Please Register!!!");
          navigate("/register-page");
        }
      } catch (error) {
        console.error("Error during login:", error);
        alert("An error occurred. Please try again.");
      } finally {
        setButtonText('Login');
        setIsButtonDisabled(false);
      }
    } else {
      alert("Please enter your Student ID and Password.");
    }
  };

  return (
    <div className="centerdiv" id="loginPage">
      <h1>Student Login</h1>
      <img src="./student-login.svg" alt="student logo" />
      <form className="loginForm" onSubmit={submit}>
        <input
          type="text"
          placeholder="Student ID: 22JEXXXX"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value.toUpperCase())}
        />
        <br /><br />
        <input
          className="password"
          type={showPassword ? "text" : "password"}
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <a className="passwordVisbility" type="button" onClick={togglePassword}>
            {showPassword ? "Hide" : "Show"}
          </a>
        <br />
        <button type="submit" disabled={isButtonDisabled}>
          {buttonText}
        </button>
      </form>
      <br /><Link to="/forgot-password-page">Forgot password?</Link><br /><br />
      <Link to="/register-page">Not registered?</Link><br /><br />
      <Link to="/home-page" onClick={guestLogin}>Guest User <br />(No credentials required)</Link>
    </div>
  );
}

export default LoginPage;
