import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'

const Page401 = () => {
    const navigate = useNavigate()
    const handleLoginClick = () => {
        navigate("/login")
    }
    return (
        <div className="Error">
            <h1>Unauthorized</h1>
            <p>ACCESS IS ALLOWED ONLY FOR REGISTERED USERS</p>
            <Button
                name="Back to Login"
                className="btn btn-primary"
                onClick={handleLoginClick}
            />
        </div>
    )
}

export default Page401