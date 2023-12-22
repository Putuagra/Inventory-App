import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import Button from '../components/Button'
import AccountRoleRepository from '../repositories/AccountRoleRepository'
import AccountRoleForm from '../components/accountRoles/AccountRoleForm'

const AddAccountRole = () => {
    const navigate = useNavigate()
 
    const location = useLocation()
    const guid = location.state?.guid
    const { handleCreate } = AccountRoleRepository()

    const handleBackClick = () => {
        navigate("/account-role", { state: { guid } })
    }

    return (
        <div>
            <AccountRoleForm
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

export default AddAccountRole