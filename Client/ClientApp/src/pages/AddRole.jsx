import { useNavigate } from 'react-router-dom'
import RoleRepository from '../repositories/RoleRepository'
import RoleForm from '../components/roles/RoleForm'
import Button from '../components/Button'

const AddRole = () => {
    const navigate = useNavigate()
    const handleRoleClick = () => {
        navigate('/role')
    }

    const { handleCreate, handleCheckRole } = RoleRepository()

    return (
        <div>
            <RoleForm
                handleCreate={handleCreate}
                handleCheckRole={handleCheckRole}
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