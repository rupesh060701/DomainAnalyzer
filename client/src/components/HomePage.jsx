import "./HomePage.css"
import LoginPage from "./LoginPage"

export default function HomePage() {
    return (
        <div className="home_container">

            <div className="left_section">
                <div className="logo">
                    <img src="./logo.jpg" alt="logo" />
                    <span>Ful<span className="dot">●</span>io</span>
                </div>
                <div className="main_title">
                    Know Everything About Your Prospect. Real Time.
                </div>
            </div>

            <div className="right_section">
                <LoginPage/>
            </div>

        </div>
    )
}
