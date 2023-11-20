import { checkEmailAvailability } from "../apis/UserAPI"
import UserForm from "../components/users/UserForm"
import AuthRepository from "../repositories/AuthRepository"

const Register = () => {
    const { handleRegister } = AuthRepository()
    return (
        <div>
            <UserForm
                handleRegister={handleRegister}
                handleCheckEmail={checkEmailAvailability}
            />
        </div>
    )
}

export default Register