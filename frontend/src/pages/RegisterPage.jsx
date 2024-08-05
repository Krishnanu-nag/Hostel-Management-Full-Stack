import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function RegisterPage() {
  const [isRegistered, setIsRegistered] = useState(false);
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const baseURL = import.meta.env.VITE_BASE_URL;


  let submit = async (e) => {
    if (studentId != "" && password != "") {
      e.preventDefault();
    
        await axios.post(`${baseURL}/register-page`,  {
          studentId,
          password,
        })
      .then((result)=>{
        if (result.data==="ExistingUser") {alert("User Exists!!! Go to  Login"),navigate("/login-page")}
        else  {alert("Successfully Registered !!! Now Login"),navigate("/login-page")}
      })       
      .catch ((e)=>{ console.log(e);}) 
       
    }
      // 
     else {
      alert("Please enter credentials");
    }
  }
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  function guestLogin(){
    localStorage.removeItem("studentId");
    localStorage.removeItem("password");
    localStorage.removeItem("selectedBlock");
    localStorage.removeItem("selectedFloor");
    localStorage.removeItem("selectedRoom");
    localStorage.setItem("studentId","Admin")
    localStorage.setItem("password","guest1234")
  }

  

  return (
    <>
      <div className="centerdiv" id="loginPage">
        <h1>Student Register</h1>
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
          {/* <span className="showpassword" onClick={show}>Show</span> */}
          <br />
        </form>
        <button type="submit" onClick={submit}>
          Register
        </button>
        <br />
        <br />
        <Link to="/login-page">Already registered?</Link><br/><br/>
        <Link to="/home-page" onClick={guestLogin}> Guest user no credentials Required</Link>
      </div>
    </>
  );
}
export default RegisterPage;
