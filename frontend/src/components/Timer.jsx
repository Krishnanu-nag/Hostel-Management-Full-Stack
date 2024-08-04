import "./Timer.css"
import { useEffect, useState } from "react"

function Timer() {
    const [duration, setDuration] = useState(3 * 60 * 1000);

    useEffect(() => {
        if (duration > 0) {
            const timerId = setTimeout(() => {
                setDuration(duration - 1000);
            }, 1000);

            return () => clearTimeout(timerId);
        } else {
            window.location.reload();
        }
    }, [duration]);

    const showTimer = (millisec) => {
        let totalsec = parseInt(Math.floor(millisec / 1000));
        let totalmin = parseInt(Math.floor(totalsec / 60));
        let sec = parseInt(totalsec % 60);
        let min = parseInt(totalmin % 60);

        return `${min}:${sec < 10 ? `0${sec}` : sec}`;
    }

    return (
        <>
            <div className="timerContainer">
                <span>Time Left</span>
                <div className="timer">
                    {showTimer(duration)}
                </div>
            </div>
        </>
    )
}

export default Timer;
