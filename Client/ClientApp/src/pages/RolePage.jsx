import { useNavigate } from 'react-router-dom'
import RoleList from "../components/roles/RoleList"
import Navigate from "../components/Navigate"
import RoleRepository from '../repositories/RoleRepository'
import Button from '../components/Button'

const RolePage = () => {
    const navigate = useNavigate()
    const { roles, handleUpdate, editingRole, handleInputChange, handleEdit, handleDelete } = RoleRepository()

    const handleAddRoleClick = () => {
        navigate("/add-role")
    }

    return (
        <div className="container">
            <Navigate />
            <RoleList
                roles={roles}
                handleUpdate={handleUpdate}
                editingRole={editingRole}
                handleInputChange={handleInputChange}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
            />
            <Button
                name="Add Role"
                className="btn btn-primary"
                onClick={handleAddRoleClick}
            />
        </div>
    )
}

export default RolePage