import { useEffect, useState } from "react"
import { useNavigate, useLocation } from 'react-router-dom'
import Button from "../Button"
import ErrorAlert from "../ErrorAlert"
import Select from "../Select"
import SuccessAlert from "../SuccessAlert"
import { getExcludeRole } from "../../apis/UserAPI"

export default function UserRoleForm(props) {

    const { handleCreate, roleGuid } = props
    const navigate = useNavigate()
    const location = useLocation()
    const guid = location.state?.guid
    const [newUserRole, setNewUserRole] = useState({ userGuid: '', roleGuid })
    const [excludeUsers, setExcludeUsers] = useState([])

    const handleChange = (e) => {
        const { value } = e.target
        setNewUserRole({ ...newUserRole, userGuid: value })
    }

    const handleBackClick = () => {
        navigate("/user-role", { state: { guid } })
    }

    const handleCreateUserRole = async () => {
        try {
            await excludeRole()
            await handleCreate(newUserRole)
            setNewUserRole({ ...newUserRole, userGuid: ''})
            SuccessAlert({ message: 'Add User Role successful.' })
            handleBackClick()
        } catch(error){
            console.error('Error during add:', error)
            ErrorAlert({ message: 'Failed to add user role. Please try again later.' })
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
        handleCreateUserRole()
    }

    useEffect(() => {
        excludeRole()
    }, [roleGuid])

    return (
        <div className="row">
            <div className="col-lg-12" noValidate>
                <form
                    onSubmit={handleSubmit}
                    className="row g-3 needs-validation"
                >
                    <Select
                        name="userGuid"
                        label="User"
                        value={newUserRole.userGuid}
                        onChange={handleChange}
                        options={excludeUsers}
                    />
                    <Button
                        name="Add User Role"
                        className="btn btn-primary"
                    />
                </form>
            </div>
        </div>
    )
}