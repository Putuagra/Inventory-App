import { changePassword, forgotPassword, register } from "../apis/AccountApi"


export default function AuthRepository() {
    const handleRegister = async (newUser) => {
        try {
            await register(newUser)
        } catch (error) {
            console.error("Error create user", error)
        }
    }

    const handleForgotPassword = async (email) => {
        try {
            return await forgotPassword(email)
        } catch (error) {
            console.error('Error sending forgot password request:', error)
        }
    }

    const handleChangePassword = async (data) => {
        try {
            return await changePassword(data)
        } catch (error) {
            console.error('Error sending change password request:', error)
        }
    }

    return { handleRegister, handleForgotPassword, handleChangePassword }
}