import "./PopUp.css";
import { useState, useEffect } from "react";
function PopUp() {
  let [closed, setclosed] = useState(false);
  return (
    <>
      {closed == false ? (

        <span className="popup-bg">
          <div className="centerdiv">
            <h2>Important !!</h2>
            <br />
            <p>
              Only <b>Aquamarine </b>for Boy's hostel is ready for{" "}
              <b>online allocation.</b>For rest of the hostels will be updated
              shorly.<b>Clicking</b> on any other hostel will redirect to
              Aquamarine Hostel Page only
            </p>
            <br />
            <div className="popup-ok-btn">
              <button onClick={() => setclosed(true)}>Ok</button>
            </div>
          </div>
        </span>

      ) : <></>}
    </>
  );
}
export default PopUp;
