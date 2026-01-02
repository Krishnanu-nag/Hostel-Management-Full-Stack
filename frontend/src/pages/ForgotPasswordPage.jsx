import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;

function ForgotPasswordPage() {
  const [studentId, setStudentId] = useState("");
  const [buttonText, setButtonText] = useState("Get Password over mail");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (studentId !== "") {
      setButtonText("Sending...");
      setIsButtonDisabled(true);

      try {
        const result = await axios.post(`${baseURL}/forgot-password`, {
          studentId,
        });

        if (result.data === "PasswordSent") {
          alert(
            `Password has been sent to your email at : ${studentId}@iitism.ac.in.`
          );
          navigate("/login-page");
        } else if (result.data === "UserNotFound") {
          alert(
            "No user found with this Student ID . Please type Student ID only and try again."
          );
        }
      } catch (error) {
        console.error("Error in sending password:", error);
        alert("An error occurred while sending your password.");
      } finally {
        setButtonText("Get Password");
        setIsButtonDisabled(false);
      }
    } else {
      alert("Please enter your Student ID.");
    }
  };

  return (
    <div className="centerdiv" id="loginPage">
      <h1>Get Password</h1>
      <img src="./student-login.svg" alt="student logo" />
      <form className="loginForm">
        <input
          type="text"
          placeholder="Student ID: 22JEXXXX"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value.toUpperCase().trimStart())}
        />
        <br />
        <br />
        <button onClick={handleSubmit} disabled={isButtonDisabled}>
          {buttonText}
        </button>
      </form>
      <br />
      <Link to="/login-page">Back to Log In</Link>
      <br />
      <br />
    </div>
  );
}

export default ForgotPasswordPage;
