import { register } from "../apis/UserAPI"

export default function AuthRepository() {
    const handleRegister = async (newUser) => {
        try {
            await register(newUser)
        } catch (error) {
            console.error("Error create user", error)
        }
    }

    return { handleRegister }
}