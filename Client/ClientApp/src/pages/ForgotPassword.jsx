import { useState } from 'react'
import ErrorAlert from '../components/ErrorAlert'
import SuccessAlert from '../components/SuccessAlert'
import { checkEmailAvailability } from '../apis/UserAPI'
import Button from '../components/Button'
import AuthRepository from '../repositories/AuthRepository'
import Input from '../components/Input'
import { useNavigate } from 'react-router-dom'

const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    const { handleForgotPassword } = AuthRepository()
    const navigateChangePassword = useNavigate()

    const handleChange = (e) => {
        const { value } = e.target;
        setEmail(value);
    }

    const ForgotPasswordEmail = async () => {
        try {
            const response = await handleForgotPassword(email)
            switch (response) {
                case 404:
                    ErrorAlert({ message: 'Email not found' })
                    break
                case 500:
                    ErrorAlert({ message: 'Error retrieving data from the database' })
                    break
                case 200:
                    SuccessAlert({ message: 'Otp has been sent to your email.' })
                    navigateChangePassword('/change-password')
                    break
                default:
                    ErrorAlert({ message: 'Failed to forgot password. Please try again later.' })
                    break
            }
        } catch (error) {
            ErrorAlert({ message: 'An unexpected error occurred.' })
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        ForgotPasswordEmail()
    }

    return (
        <div>
            <h1>Forgot Password</h1>
            <form onSubmit={handleSubmit}>
                <Input
                    name="Email"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={handleChange}
                />
                <Button
                    name="Submit"
                    className="btn btn-primary"
                />
            </form>
        </div>
    )
}

export default ForgotPassword