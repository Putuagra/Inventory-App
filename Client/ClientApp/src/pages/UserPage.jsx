import { checkEmailAvailability } from "../apis/UserAPI"
import { RemoveAuth } from "../components/Auth"
import Button from "../components/Button"
import { useNavigate } from 'react-router-dom'
import Navigate from "../components/Navigate"
import UserList from "../components/users/UserList"
import UserRepository from "../repositories/UserRepository"

const UserPage = () => {
    const { users, editingUser, handleEdit, handleInputChange, handleUpdate, handleDelete, nameDecode } = UserRepository()
    const navigateLogout = useNavigate()
    const handleLogout = () => {
        RemoveAuth()
        navigateLogout('/login')
    }
    return (
        <div className="container">
            <Navigate />
            <br></br>
            <h1>Welcome, {nameDecode}</h1>
            <UserList
                users={users}
                editingUser={editingUser}
                handleEdit={handleEdit}
                handleInputChange={handleInputChange}
                handleUpdate={handleUpdate}
                handleDelete={handleDelete}
                handleCheckEmail={checkEmailAvailability}
            />
            <Button
                name="Logout"
                className="btn btn-danger"
                onClick={handleLogout}
            />
        </div>
    )
}

export default UserPage