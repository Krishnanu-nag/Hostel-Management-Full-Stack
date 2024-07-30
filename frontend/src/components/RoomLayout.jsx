import "./RoomLayout.css";
import { useEffect } from "react";

function RoomLayout() {
  return (
    <>
      <div id="aquamarineRoomLayout">
        <div id="aquamarineRoomSelect">
          {/* <label class="custom-checkbox">
            <input type="checkbox" name="" id="1" />
            <span class="checkmark">1</span>
          </label>
          <label class="custom-checkbox">
            <input type="checkbox" name="" id="1" />
            <span class="checkmark">2</span>
          </label>
          <label class="custom-checkbox">
            <input type="checkbox" name="" id="1" />
            <span class="checkmark">3</span>
          </label>
          <label class="custom-checkbox">
            <input type="checkbox" name="" id="1" />
            <span class="checkmark">4</span>
          </label>
          <label class="custom-checkbox">
            <input type="checkbox" name="" id="1" />
            <span class="checkmark">5</span>
          </label>

         
          <br />
          <br />

           <label class="custom-checkbox">
            <input type="checkbox" name="" id="1" />
            <span class="checkmark">10</span>
          </label>

           <label class="custom-checkbox">
            <input type="checkbox" name="" id="1" />
            <span class="checkmark">9</span>
          </label>

           <label class="custom-checkbox">
            <input type="checkbox" name="" id="1" />
            <span class="checkmark">8</span>
          </label>

           <label class="custom-checkbox">
            <input type="checkbox" name="" id="1" />
            <span class="checkmark">7</span>
          </label>

           <label class="custom-checkbox">
            <input type="checkbox" name="" id="1" />
            <span class="checkmark">6</span>
          </label>          */}

          <label class="custom-radio">
            <input type="radio" name="option" />
            <span class="checkmark"><p className="centerdiv">1</p></span>
          </label>

          <label class="custom-radio">
            <input selected type="radio" name="option" disabled  />
            <span id="2" class="checkmark" style={{backgroundColor:"#FF0000"}}><p className="centerdiv">2</p></span>
          </label>

          <label class="custom-radio">
            <input type="radio" name="option" />
            <span class="checkmark"><p className="centerdiv">3</p></span>
          </label>

          <label class="custom-radio">
            <input selected type="radio" name="option" />
            <span class="checkmark"><p className="centerdiv">4</p></span>
          </label>

          <label class="custom-radio">
            <input selected type="radio" name="option" />
            <span class="checkmark"><p className="centerdiv">5</p></span>
          </label> 

          <br/>
          <br/>

          <label class="custom-radio">
            <input type="radio" name="option" />
            <span class="checkmark"><p className="centerdiv">10</p></span>
          </label>

          <label class="custom-radio">
            <input selected type="radio" name="option" />
            <span class="checkmark"><p className="centerdiv">9</p></span>
          </label>

          <label class="custom-radio">
            <input type="radio" name="option" />
            <span class="checkmark"><p className="centerdiv">8</p></span>
          </label>

          <label class="custom-radio">
            <input selected type="radio" name="option" />
            <span class="checkmark"><p className="centerdiv">7</p></span>
          </label>

          <label class="custom-radio">
            <input selected type="radio" name="option" />
            <span class="checkmark"><p className="centerdiv">6</p></span>
          </label> 
          
        </div>
      </div>
    </>
  );
}
export default RoomLayout;
