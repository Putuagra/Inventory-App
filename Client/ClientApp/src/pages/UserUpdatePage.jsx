import { useLocation } from 'react-router-dom'
import UserUpdate from "../components/users/UserUpdate"
import UserRepository from '../repositories/UserRepository'
import { checkEmailAvailability } from '../apis/UserAPI'
import Navigate from '../components/Navigate'

const UserUpdatePage = () => {

    const location = useLocation()
    const guid = location.state?.guid
    const prevUserEmail = location.state?.prevUserEmail
    const { handleUpdate, handleGetUserById } = UserRepository()

    return (
        <div className="container">
            <Navigate />
            <br></br>
            <UserUpdate
                guid={guid}
                prevUserEmail={prevUserEmail}
                handleUpdate={handleUpdate}
                handleCheckEmail={checkEmailAvailability}
                handleGetUserById={handleGetUserById }
            />
        </div>
    )
}

export default UserUpdatePage