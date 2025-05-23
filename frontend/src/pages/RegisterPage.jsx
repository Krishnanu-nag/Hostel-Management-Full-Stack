import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function RegisterPage() {
  const [studentId, setStudentId] = useState("");
  const [studentName, setStudentName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // State for confirm password
  const [otp, setOtp] = useState(""); // State for OTP
  const [isOtpSent, setIsOtpSent] = useState(false); // State to track OTP sending status
  const [buttonText, setButtonText] = useState("Send OTP");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const navigate = useNavigate();
  const baseURL = import.meta.env.VITE_BASE_URL;
  const [hasAlerted, setHasAlerted] = useState(false);

  useEffect(() => {
    if (password !== "" && !hasAlerted) {
      alert(
        "Don't set your official password. Set something creative. I know you are good at it."
      );
      setHasAlerted(true); // Set to true so the alert doesn't show again
    }
  }, [password, hasAlerted]);

  const checkAndSendOtp = async (e) => {
    localStorage.removeItem("studentId");
    e.preventDefault();
    if (studentId && password && confirmPassword) {
      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      if (!(studentId.startsWith("22JE") || studentId.startsWith("23JE"))) {
        alert("Currently only for 22JE and 23JE students.");
        return;
      }
      setButtonText("Wait...");
      setIsButtonDisabled(true);

      try {
        // Check if the user already exists
        const userCheckResult = await axios.post(`${baseURL}/check-user`, {
          studentId,
        });

        if (userCheckResult.data === "ExistingUser") {
          alert("User exists! Redirecting to login.");
          navigate("/login-page");
        } else {
          // Send OTP if the user doesn't exist
          const otpSendResult = await axios.post(`${baseURL}/send-otp`, {
            studentId,
          });

          if (otpSendResult.data === "OtpSent") {
            setIsOtpSent(true); // OTP sent, proceed to OTP verification
            alert(
              `OTP sent to ${studentId}@iitism.ac.in! Please check your email.`
            );
          } else {
            alert("Failed to send OTP. Please try again.");
          }
        }
      } catch (error) {
        console.error("Error occurred:", error);
        alert(
          "An error occurred while sending OTP. Please type Student ID only and try again."
        );
      } finally {
        setButtonText("Register");
        setIsButtonDisabled(false);
      }
    } else {
      alert("Please enter Student ID, Password, and Confirm Password.");
    }
  };

  const verifyOtp = async () => {
    if (otp.trim()) {
      setButtonText("Verifying...");
      setIsButtonDisabled(true);

      try {
        const verifyResult = await axios.post(`${baseURL}/verify-otp`, {
          studentName,
          studentId,
          otp,
          password,
        });

        if (verifyResult.data === "OtpVerified") {
          alert("Successfully registered!");
          localStorage.setItem("studentId", studentId);
          navigate("/home-page");
        } else if (verifyResult.data === "InvalidOtp") {
          alert("Invalid OTP. Please try again.");
        } else if (verifyResult.data === "ExistingUser") {
          alert("User already exists! Redirecting to login.");
          navigate("/login-page");
        }
      } catch (error) {
        console.error("Error during OTP verification:", error);
        alert("An error occurred during OTP verification. Please try again.");
      } finally {
        setButtonText("Register");
        setIsButtonDisabled(false);
      }
    } else {
      alert("Please enter the OTP.");
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const guestLogin = () => {
    localStorage.setItem("studentId", "Guest");
  };

  return (
    <div className="centerdiv" id="loginPage">
      <h1>Student Register</h1>
      <img src="./student-login.svg" alt="student logo" />
      <form className="loginForm">
        <input
          type="text"
          placeholder="Student ID: 22JEXXXX"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value.toUpperCase().trim())}
          disabled={isOtpSent} // Disable editing if OTP is sent
        />
        <br />
        <input
          type="text"
          placeholder="Enter Name"
          value={studentName}
          onChange={(e) =>
            setStudentName(e.target.value.toUpperCase().trimStart())
          }
          disabled={isOtpSent} // Disable editing if OTP is sent
        />
        <br />
        {!isOtpSent && (
          <>
            <input
              className="password"
              type={showPassword ? "text" : "password"}
              placeholder="Set Password"
              value={password}
              onChange={(e) => setPassword(e.target.value.trimStart())}
            />
            <br />
            <input
              className="password"
              type={showPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value.trimStart())}
            />
            <br />
            <a
              className="passwordVisbility"
              type="button"
              onClick={togglePassword}
            >
              {showPassword ? "Hide" : "Show"}
            </a>
            <br />
          </>
        )}
        {!isOtpSent ? (
          <button
            type="submit"
            onClick={checkAndSendOtp}
            disabled={isButtonDisabled}
          >
            {buttonText}
          </button>
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <br />
            <br />
            <button
              type="button"
              onClick={verifyOtp}
              disabled={isButtonDisabled}
            >
              {buttonText}
            </button>
          </>
        )}
      </form>
      <br />
      <br />
      <Link to="/login-page">
        Already registered?
        <br /> Log in here.
      </Link>
      <br />
      <br />
      <Link to="/home-page" onClick={guestLogin}>
        Guest User <br />
        (No credentials required)
      </Link>
    </div>
  );
}

export default RegisterPage;
