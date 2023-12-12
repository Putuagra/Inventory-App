import { useNavigate } from 'react-router-dom'
import RoleRepository from '../repositories/RoleRepository'
import RoleForm from '../components/roles/RoleForm'
import { checkRole } from '../apis/RoleApi'
import Button from '../components/Button'

const AddRole = () => {
    const navigate = useNavigate()
    const handleRoleClick = () => {
        navigate('/role')
    }

    const { handleCreate } = RoleRepository()

    return (
        <div>
            <RoleForm
                handleCreate={handleCreate}
                handleCheckRole={checkRole}
            />
            <Button
                name="Back"
                className="btn btn-primary"
                onClick={handleRoleClick}
            />
        </div>
    )
}

export default AddRole