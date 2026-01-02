import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const forgotPasswordURL = `${import.meta.env.VITE_BASE_URL}/forgot-password`;

function ForgotPasswordPage() {
  const [studentId, setStudentId] = useState("");
  const [buttonText, setButtonText] = useState("Get Password over mail");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!studentId) {
      alert("Please enter your Student ID.");
      return;
    }

    setButtonText("Sending...");
    setIsButtonDisabled(true);

    try {
      const result = await axios.post(forgotPasswordURL, {
        studentId,
      });

      if (result.data === "PasswordSent") {
        alert(`Password sent to ${studentId}@iitism.ac.in`);
        navigate("/login-page");
      } else if (result.data === "UserNotFound") {
        alert("No user found with this Student ID");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      alert("Request failed");
    } finally {
      setButtonText("Get Password over mail");
      setIsButtonDisabled(false);
    }
  };

  return (
    <div className="centerdiv" id="loginPage">
      <h1>Get Password</h1>

      <img src="./student-login.svg" alt="student logo" />

      <form className="loginForm" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Student ID: 22JEXXXX"
          value={studentId}
          onChange={(e) =>
            setStudentId(e.target.value.toUpperCase().trimStart())
          }
        />
        <br />
        <br />
        <button type="submit" disabled={isButtonDisabled}>
          {buttonText}
        </button>
      </form>

      <br />
      <Link to="/login-page">Back to Log In</Link>
    </div>
  );
}

export default ForgotPasswordPage;


// import { Link, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import axios from "axios";

// const baseURL = import.meta.env.VITE_BASE_URL;

// function ForgotPasswordPage() {
//   const [studentId, setStudentId] = useState("");
//   const [buttonText, setButtonText] = useState("Get Password over mail");
//   const [isButtonDisabled, setIsButtonDisabled] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (studentId !== "") {
//       setButtonText("Sending...");
//       setIsButtonDisabled(true);

//       try {
//         const result = await axios.post(`${baseURL}/forgot-password`, {
//           studentId,
//         });

//         if (result.data === "PasswordSent") {
//           alert(
//             `Password has been sent to your email at : ${studentId}@iitism.ac.in.`
//           );
//           navigate("/login-page");
//         } else if (result.data === "UserNotFound") {
//           alert(
//             "No user found with this Student ID . Please type Student ID only and try again."
//           );
//         }
//       } catch (error) {
//         console.error("Error in sending password:", error);
//         alert("An error occurred while sending your password.");
//       } finally {
//         setButtonText("Get Password");
//         setIsButtonDisabled(false);
//       }
//     } else {
//       alert("Please enter your Student ID.");
//     }
//   };

//   return (
//     <div className="centerdiv" id="loginPage">
//       <h1>Get Password</h1>
//       <img src="./student-login.svg" alt="student logo" />
//       <form className="loginForm">
//         <input
//           type="text"
//           placeholder="Student ID: 22JEXXXX"
//           value={studentId}
//           onChange={(e) => setStudentId(e.target.value.toUpperCase().trimStart())}
//         />
//         <br />
//         <br />
//         <button onClick={handleSubmit} disabled={isButtonDisabled}>
//           {buttonText}
//         </button>
//       </form>
//       <br />
//       <Link to="/login-page">Back to Log In</Link>
//       <br />
//       <br />
//     </div>
//   );
// }

// export default ForgotPasswordPage;
