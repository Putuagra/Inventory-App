import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'

const Page403 = () => {
    const navigate = useNavigate()
    const handleHomeClick = () => {
        navigate("/product")
    }
    return (
        <div className="Error">
            <h1>403 Forbidden</h1>
            <p>YOU DON'T HAVE PERMISSION TO ACCESS THIS PAGE.</p>
            <Button
                name="Back to Home"
                className="btn btn-primary"
                onClick={handleHomeClick}
            />
        </div>
    )
}

export default Page403