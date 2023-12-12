import { useState } from "react"
import { RoleStatusValidate, ValidateDataRole } from "../../Validation/Roles/RoleValidation"
import ErrorAlert from "../ErrorAlert"
import SuccessAlert from "../SuccessAlert"
import Input from "../Input"
import Button from "../Button"

const RoleForm = (props) => {
    const { handleCreate, handleCheckRole } = props
    const [newRole, setNewRole] = useState({ name: '' })

    const handleChange = (e) => {
        const { value } = e.target
        setNewRole({ name: value })
    }

    const handleCreateRole = async () => {
        const validationError = ValidateDataRole(newRole)

        if (validationError) {
            ErrorAlert({ message: validationError })
            return
        }

        const status = await handleCheckRole(newRole.name)
        const statusValidation = RoleStatusValidate(status)

        if (statusValidation) {
            ErrorAlert({ message: statusValidation })
            return
        } else if (status === 404) {
            try {
                await handleCreate(newRole)
                setNewRole({ name: '' })
                SuccessAlert({ message: 'Add Role Name successful.' })
            } catch (error) {
                console.error('Error during add:', error)
                ErrorAlert({ message: 'Failed to add role. Please try again later.' })
            }
        }
        else {
            ErrorAlert({ message: 'Failed to check role availability. Please try again later.' })
        }  
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        handleCreateRole()
    }

    return (
        <div className="row">
            <div className="col-lg-12" noValidate>
                <form
                    onSubmit={handleSubmit}
                    className="row g-3 needs-validation"
                >
                    <Input
                        name="name"
                        type="text"
                        placeholder="Role Name"
                        value={newRole.name}
                        onChange={handleChange}
                    />
                    <Button
                        name="Add Role"
                        className="btn btn-primary"
                    />
                </form>
            </div>
        </div>
    )
}

export default RoleForm