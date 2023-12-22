import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import Navigate from '../components/Navigate'
import Button from '../components/Button'
import AccountRoleRepository from '../repositories/AccountRoleRepository'
import AccountRoleList from '../components/accountRoles/AccountRoleList'

const AccountRolePage = () => {

    const navigate = useNavigate()
    const location = useLocation()
    const guid = location.state?.guid
    const { users, handleDelete } = AccountRoleRepository(guid) 

    const handleAddAccountRoleClick = () => {
        navigate("/add-account-role", { state: { guid } })
    }

    const handleBackClick = () => {
        navigate("/role")
    }

    return (
        <div className="container">
            <Navigate />
            <AccountRoleList
                users={users}
                handleDelete={handleDelete}
                roleGuid={guid }
            />
            <Button
                name="Add User Role"
                className="btn btn-primary"
                onClick={handleAddAccountRoleClick}
            />
            <Button
                name="Back"
                className="btn btn-primary"
                onClick={handleBackClick}
            />
        </div>
    )
}

export default AccountRolePage