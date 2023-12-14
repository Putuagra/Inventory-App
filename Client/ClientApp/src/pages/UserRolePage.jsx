import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import UserRoleList from '../components/userRoles/UserRoleList'
import Navigate from '../components/Navigate'
import UserRoleRepository from '../repositories/UserRoleRepository'
import Button from '../components/Button'

const UserRolePage = () => {

    const navigate = useNavigate()
    const location = useLocation()
    const guid = location.state?.guid
    const { users, handleDelete } = UserRoleRepository(guid) 

    const handleAddUserRoleClick = () => {
        navigate("/add-user-role", { state: { guid } })
    }

    const handleBackClick = () => {
        navigate("/role")
    }

    return (
        <div className="container">
            <Navigate />
            <UserRoleList
                users={users}
                handleDelete={handleDelete}
                roleGuid={guid }
            />
            <Button
                name="Add User Role"
                className="btn btn-primary"
                onClick={handleAddUserRoleClick}
            />
            <Button
                name="Back"
                className="btn btn-primary"
                onClick={handleBackClick}
            />
        </div>
    )
}

export default UserRolePage