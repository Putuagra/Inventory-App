import { checkEmailAvailability } from "../apis/UserAPI"
import UserForm from "../components/users/UserForm"
import UserRepository from "../repositories/UserRepository"

const Register = () => {
    const { handleRegister } = UserRepository()
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