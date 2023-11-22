import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'

const HomePage = () => {
    const navigate = useNavigate()
    const handleLoginClick = () => {
        navigate("/login")
    }
    return (
        <div className="home-container">
            <header className="header">
                <h1>Welcome to Our Website</h1>
                <p>Explore the amazing features we offer!</p>
            </header>

            <section className="main-content">
                <p className="tagline">Discover a New Experience</p>
                <Button
                    name="Login"
                    className="btn btn-primary"
                    onClick={handleLoginClick}
                />
            </section>
        </div>
    )
}

export default HomePage