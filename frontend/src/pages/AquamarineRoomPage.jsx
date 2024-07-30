import "./AquamarineRoomPage.css";
import MainLayout from "../layout/MainLayout";
import RoomLayout from "../components/RoomLayout";
import { useState } from "react";
function AquamarineRoomPage() {
  let [ischeckRoom,setcheckRoom]=useState(false)
  return (
    <>
      <MainLayout>
        <div id="aquamarineRoomPage">
          <div className="form-container">
          <form action="">
          <label htmlFor="block">Choose Block : </label>
            <select name="block" id="block">
              <option value="" hidden>Select</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="E">E</option>
              <option value="G">G</option>
              <option value="J">J</option>
            </select>
            <br/>
            <br/>
          <label htmlFor="floor">Choose Floor : </label>
            <select name="block" id="block">
              <option value="" hidden>Select</option>
              <option value="G">G</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
              <option value="13">13</option>
            </select>
            <br />
            <br />
            <button onClick={(e)=>{e.preventDefault(),setcheckRoom(true)}}> Check Available Rooms </button>
          </form>
          </div>
           {ischeckRoom && <RoomLayout/>}   
           
        </div>
      </MainLayout>
    </>
  );
}
export default AquamarineRoomPage;
