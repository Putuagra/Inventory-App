import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'

const HomePage = () => {
    const navigate = useNavigate()
    const handleLoginClick = () => {
        navigate("/login")
    }
    return (
        <div>
            <Button
                name="Login"
                className="btn btn-primary"
                onClick={handleLoginClick}
            />
        </div>
    )
}

export default HomePage