import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios"
function LoginPage(){
    const [studentId, setStudentId] = useState("");
    const [password, setPassword] = useState("");
    const navigate=useNavigate()
    let submit = async (e) => {
      if (studentId != "" && password != "") {
        e.preventDefault();

        await axios
          .post("http://localhost:3000/login-page", {
            studentId,
            password,
          })
          .then((result) => {
            if (result.data === "Success") {
              alert(`Welcome ${studentId}`)  
              navigate("/home-page");
            }
            else if (result.data === "Failed") {
              alert("Invalid Password")  
            }
            else if (result.data === "Invalid") {
              alert("User not registered. Please Register !!!")  
              navigate("/register-page")
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

    return(
        <>
            <div className="centerdiv" id="loginPage">
            <h1>Student Login</h1>
            <img src="./student-login.svg" alt="student logo"/>
            <form className="loginForm">
                <input type="text" placeholder="Enter Student ID" onChange={(e)=>setStudentId(e.target.value.toUpperCase())}/><br/><br/>
                <input type="password" placeholder="Enter Password" onChange={(e)=>setPassword(e.target.value)}/><br/><br/>
            </form>
            <button type="submit" onClick={submit}>Login</button>
            </div>
        </>

    )
}
export default LoginPage