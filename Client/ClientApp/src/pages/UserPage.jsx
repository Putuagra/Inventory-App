import Navigate from "../components/Navigate"
import UserList from "../components/users/UserList"
import UserRepository from "../repositories/UserRepository"

const UserPage = () => {
    const { users, handleDelete } = UserRepository()

    return (
        <div className="container">
            <Navigate />
            <br></br>
            <UserList
                users={users}
                handleDelete={handleDelete}
            />
        </div>
    )
}

export default UserPage