import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import UserRoleForm from '../components/userRoles/UserRoleForm'
import UserRoleRepository from '../repositories/UserRoleRepository'
import Button from '../components/Button'

const AddUserRole = () => {
    const navigate = useNavigate()
 
    const location = useLocation()
    const guid = location.state?.guid
    const { handleCreate } = UserRoleRepository()

    const handleBackClick = () => {
        navigate("/user-role", { state: { guid } })
    }

    return (
        <div>
            <UserRoleForm
                handleCreate={handleCreate}
                roleGuid={guid }
            />
            <Button
                name="Back"
                className="btn btn-primary"
                onClick={handleBackClick}
            />
        </div>
    )
}

export default AddUserRole