import "./ConfirmRoom.css"
function ConfirmRoom(data){
    console.log(data)
    return(
        <>
        <div className="confirmRoom">
            <div className="container" id="block"><h1>{data.block}</h1></div><h1>/</h1>
            <div className="container" id="floor"><h1>{data.floor}</h1></div><h1>/</h1>
            <div className="container" id="roomNo"><h1>{data.room}</h1></div>
        </div>
        </>
    )
}
export default ConfirmRoom