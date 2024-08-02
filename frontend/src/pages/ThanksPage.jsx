import "./ThanksPage.css"
import { Link } from "react-router-dom"
function ThanksPage(){
    return(
        <>
        <div className="centerdiv">
            Thank You for your cooperation<br/><br/>
            <Link to="/">
            <button>Back to Login</button>
            </Link>
        </div>
        </>
    )
}
export default ThanksPage