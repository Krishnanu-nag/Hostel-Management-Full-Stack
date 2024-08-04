import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
function LoginPage() {
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const [newLogin, setNewLogin] = useState(false);   //removes old login info saved on local storage if previously not removed by logging out 
  const navigate = useNavigate();
  if (!newLogin){
    localStorage.removeItem("studentId");
    localStorage.removeItem("password");
    localStorage.removeItem("selectedBlock");
    localStorage.removeItem("selectedFloor");
    localStorage.removeItem("selectedRoom");
  }
  

  let submit = async (e) => {
    if (studentId != "" && password != "") {
      e.preventDefault();
      setNewLogin(true);  //old account details gets delected and new gets stored
      localStorage.setItem('studentId', studentId);
      localStorage.setItem('password', password);
      setStudentId(""); // Clear the form fields for better user experience
      setPassword("");

      await axios
        .post("http://localhost:3000/login-page", {
          studentId,
          password,
        })
        .then((result) => {
          if (result.data === "Success") {
            alert(`Welcome ${studentId}`);
            navigate("/home-page");
          } else if (result.data === "Failed") {
            alert("Invalid Password");
            window.location.reload(false); //refreshes page for invalid credentials
          } else if (result.data === "Invalid") {
            alert("User not registered. Please Register !!!");
            navigate("/register-page");
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
    //
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
            placeholder="Enter Student ID"
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
        <button type="submit" onClick={submit}>
          Login
        </button><br/><br/>
        <Link to="/register-page">Not registered?</Link>
      </div>
    </>
  );
}
export default LoginPage;
