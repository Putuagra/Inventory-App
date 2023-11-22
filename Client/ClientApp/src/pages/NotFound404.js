import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'

const Page404 = () => {
    const navigate = useNavigate()
    const handleLoginClick = () => {
        navigate("/login")
    }
    return (
        <div className="Error">
            <h1>404 Not Found</h1>
            <p>THE PAGE YOU ARE LOOKING FOR MIGHT NOT EXIST.</p>
            <Button
                name="Back to Login"
                className="btn btn-primary"
                onClick={handleLoginClick}
            />
        </div>
    )
}

export default Page404