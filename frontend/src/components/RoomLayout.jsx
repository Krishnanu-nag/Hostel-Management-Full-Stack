import "./RoomLayout.css";
import { useState } from "react";


function RoomLayout() {
  const [selectedRoom,setSelectedRoom]=useState()
  // console.log(selectedRoom)
  return (
    <>
      <div id="aquamarineRoomLayout">
        <div id="aquamarineRoomSelect" onChange={(e)=>{setSelectedRoom(e.target.value)}}>

          <label class="custom-radio">
            <input value="01" type="radio" name="option" />
            <span  class="checkmark"><p className="centerdiv">1</p></span>
          </label>

          <label class="custom-radio">
            <input value="02" selected type="radio" name="option" disabled  />
            <span  class="checkmark" style={{backgroundColor:"#FF0000"}}><p className="centerdiv">2</p></span>
          </label>

          <label class="custom-radio">
            <input value="03" type="radio" name="option" />
            <span class="checkmark"><p className="centerdiv">3</p></span>
          </label>

          <label class="custom-radio">
            <input value="04" selected type="radio" name="option" />
            <span class="checkmark"><p className="centerdiv">4</p></span>
          </label>

          <label class="custom-radio">
            <input value="05" selected type="radio" name="option" />
            <span class="checkmark"><p className="centerdiv">5</p></span>
          </label> 

          <br/>
          <br/>

          <label class="custom-radio">
            <input value="10" type="radio" name="option" />
            <span class="checkmark"><p className="centerdiv">10</p></span>
          </label>

          <label class="custom-radio">
            <input value="09" selected type="radio" name="option" />
            <span class="checkmark"><p className="centerdiv">9</p></span>
          </label>

          <label class="custom-radio">
            <input value="08" type="radio" name="option" />
            <span class="checkmark"><p className="centerdiv">8</p></span>
          </label>

          <label class="custom-radio">
            <input value="07" selected type="radio" name="option" />
            <span class="checkmark"><p className="centerdiv">7</p></span>
          </label>

          <label class="custom-radio">
            <input value="06" selected type="radio" name="option" />
            <span class="checkmark"><p className="centerdiv">6</p></span>
          </label> 
          
        </div>
      </div>
    </>
  );
}
export default RoomLayout;
