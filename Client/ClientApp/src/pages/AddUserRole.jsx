import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import UserRoleForm from '../components/userRoles/UserRoleForm'
import UserRoleRepository from '../repositories/UserRoleRepository'

const AddUserRole = () => {
    const navigate = useNavigate()

    const { handleCreate } = UserRoleRepository()
    const location = useLocation()
    const guid = location.state?.guid

    return (
        <div>
            <UserRoleForm
                handleCreate={handleCreate}
                roleGuid={guid}
            />
        </div>
    )
}

export default AddUserRole