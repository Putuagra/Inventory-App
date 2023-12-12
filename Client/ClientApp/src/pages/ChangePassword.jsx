import { useState } from "react"
import Button from "../components/Button"
import Input from "../components/Input"
import AuthRepository from "../repositories/AuthRepository"
import ErrorAlert from "../components/ErrorAlert"
import SuccessAlert from "../components/SuccessAlert"
import { useNavigate } from 'react-router-dom'
import { ValidateChangePassword } from "../Validation/Users/UserValidation"

const ChangePassword = () => {

    const { handleChangePassword } = AuthRepository()

    const [changePasswordData, setChangePasswordData] = useState({
        email: '',
        otp: '',
        newPassword: '',
        confirmNewPassword: ''
    })

    const navigateLogin = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target
        setChangePasswordData({ ...changePasswordData, [name]: value })
    }

    const handleChangeNewPassword = async () => {
        const validationError = ValidateChangePassword(changePasswordData)

        if (validationError) {
            ErrorAlert({ message: validationError })
            return
        }

        try {
            const response = await handleChangePassword(changePasswordData)
            switch (response) {
                case 404:
                    ErrorAlert({ message: 'Email not found' })
                    break
                case 400:
                    ErrorAlert({ message: 'Otp is expired or is incorrect' })
                    break
                case 500:
                    ErrorAlert({ message: 'Error retrieving data from the database' })
                    break
                case 200:
                    if (changePasswordData.newPassword === changePasswordData.confirmNewPassword) {
                        SuccessAlert({ message: 'Password has been changed successfully.' })
                        navigateLogin("/login")
                    } else {
                    ErrorAlert({ message: 'New Password and Confirm New Password do not match.' })
                    }    
                    break
                default:
                    ErrorAlert({ message: 'Failed to change password. Please try again later.' })
                    break
            }
        } catch (error) {
            ErrorAlert({ message: 'An unexpected error occurred.' })
        }
    }

    const handleValidation = (e) => {
        e.preventDefault()
        handleChangeNewPassword()
    }

    return (
        <div className="container-register">
            <div className="register-form" noValidate>
                <h1>Change Password</h1>
                <form
                    onSubmit={handleValidation}
                    className="row g-3 needs-validation"
                >
                    <Input
                        name="email"
                        type="text"
                        placeholder="Email"
                        value={changePasswordData.email}
                        onChange={handleChange}
                    />
                    <Input
                        name="otp"
                        type="number"
                        placeholder="OTP"
                        value={changePasswordData.otp}
                        onChange={handleChange}
                    />
                    <Input
                        name="newPassword"
                        type="password"
                        placeholder="New Password"
                        value={changePasswordData.newPassword}
                        onChange={handleChange}
                    />
                    <Input
                        name="confirmNewPassword"
                        type="password"
                        placeholder="Confirm New Password"
                        value={changePasswordData.confirmNewPassword}
                        onChange={handleChange}
                    />
                    <Button
                        name="Change Password"
                        className="btn btn-primary"
                    />
                </form>
            </div>
        </div>
    )
}

export default ChangePassword