import { useEffect, useState } from "react"
import { useNavigate, useLocation } from 'react-router-dom'
import Button from "../Button"
import ErrorAlert from "../ErrorAlert"
import Select from "../Select"
import SuccessAlert from "../SuccessAlert"
import { getExcludeRole } from "../../apis/UserAPI"

export default function AccountRoleForm(props) {

    const { handleCreate, roleGuid } = props
    const navigate = useNavigate()
    const location = useLocation()
    const guid = location.state?.guid
    const [newAccountRole, setNewAccountRole] = useState({ accountGuid: '', roleGuid })
    const [excludeUsers, setExcludeUsers] = useState([])

    const handleChange = (e) => {
        const { value } = e.target
        setNewAccountRole({ ...newAccountRole, accountGuid: value })
    }

    const handleBackClick = () => {
        navigate("/account-role", { state: { guid } })
    }

    const handleCreateAccountRole = async () => {
        try {
            await excludeRole()
            await handleCreate(newAccountRole)
            setNewAccountRole({ ...newAccountRole, accountGuid: ''})
            SuccessAlert({ message: 'Add Account Role successful.' })
            handleBackClick()
        } catch(error){
            console.error('Error during add:', error)
            ErrorAlert({ message: 'Failed to add account role. Please try again later.' })
        }
    }

    const excludeRole = async () => {
        try {
            const data = await getExcludeRole(roleGuid)
            setExcludeUsers(data)
        } catch (error) {
            console.error('Error fetching data: ', error)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        handleCreateAccountRole()
    }

    useEffect(() => {
        excludeRole()
    }, [])

    return (
        <div className="row">
            <div className="col-lg-12" noValidate>
                <form
                    onSubmit={handleSubmit}
                    className="row g-3 needs-validation"
                >
                    <Select
                        name="accountGuid"
                        label="User"
                        value={newAccountRole.accountGuid}
                        onChange={handleChange}
                        options={excludeUsers}
                    />
                    <Button
                        name="Add Account Role"
                        className="btn btn-primary"
                    />
                </form>
            </div>
        </div>
    )
}