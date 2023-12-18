import { useNavigate } from 'react-router-dom'
import Input from '../Input'
import Button from '../Button'
import { checkRole } from '../../apis/RoleApi'
import { ValidationDuplicate } from '../../Validation/Roles/RoleValidation'
import SuccessAlert from '../SuccessAlert'
import ErrorAlert from '../ErrorAlert'
import { useEffect, useState } from 'react'

const RoleUpdate = (props) => {

    const { handleUpdate, handleGetRoleById, guid, prevRoleName } = props

    const navigate = useNavigate()

    const [updateRole, setUpdateRole] = useState({ name: '' })

    const handleInputChange = (field, value) => {
        setUpdateRole({ ...updateRole, [field]: value });
    }

    const getUpdateRole = async (guid) => {
        try {
            const response = await handleGetRoleById(guid)
            if (prevRoleName ) {
                setUpdateRole(response?.data?.data)
            }
        } catch (error) {
            ErrorAlert({ message: 'An unexpected error occurred.' })
        }
    }

    useEffect(() => {
        getUpdateRole(guid)
    }, [])

    const handleUpdateRole = async (data) => {
        const response = await checkRole(data.name)
        const validationDuplicateResult = ValidationDuplicate(data, prevRoleName, response)

        if (validationDuplicateResult) {
            ErrorAlert({ message: validationDuplicateResult })
            return
        } else {
            if ((response === 404) || prevRoleName === data.name) {
                try {
                    await handleUpdate(data)
                    SuccessAlert({ message: 'Update data successful.' })
                    navigate("/role")
                }
                catch (error) {
                    console.error('Error during update data:', error)
                    ErrorAlert({ message: 'Failed to update role. Please try again later.' })
                }
            }
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        handleUpdateRole(updateRole)
    }

    return (
        <div className="row">
            <div className="col-lg-12" noValidate>
                <form
                    onSubmit={handleSubmit}
                    className="row g-3 needs-validation"
                >
                    <Input
                        type="text"
                        value={updateRole.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                    />
                    <Button
                        name="Save"
                        className="btn btn-success"
                    />
                </form>
            </div>
        </div>
    )
}

export default RoleUpdate