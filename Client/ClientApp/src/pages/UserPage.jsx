import { checkEmailAvailability } from "../apis/UserAPI"
import Navigate from "../components/Navigate"
import UserList from "../components/users/UserList"
import UserRepository from "../repositories/UserRepository"

const UserPage = () => {
    const { users, editingUser, handleEdit, handleInputChange, handleUpdate, handleDelete } = UserRepository()
    return (
        <div className="container">
            <Navigate />
            <h1>Users</h1>
            <UserList
                users={users}
                editingUser={editingUser}
                handleEdit={handleEdit}
                handleInputChange={handleInputChange}
                handleUpdate={handleUpdate}
                handleDelete={handleDelete}
                handleCheckEmail={checkEmailAvailability}
            />
        </div>
    )
}

export default UserPage