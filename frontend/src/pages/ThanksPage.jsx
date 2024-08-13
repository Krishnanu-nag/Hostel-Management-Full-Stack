import "./ThanksPage.css"
import { Link } from "react-router-dom"
function ThanksPage(){
    (()=>{localStorage.removeItem("studentId")})
    return(
        <>
        <div className="centerdiv">
            Thank You for your cooperation<br/><br/>
            <Link to="/">
            <button>Back to Landing Page</button>
            </Link>
        </div>
        </>
    )
}
export default ThanksPage