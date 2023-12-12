import { useState } from "react"
import { ValidationDuplicate } from "../../Validation/Roles/RoleValidation"
import InputUpdate from "../InputUpdate"
import { checkRole } from "../../apis/RoleApi"
import ErrorAlert from "../ErrorAlert"
import SuccessAlert from "../SuccessAlert"
import Button from "../Button"
import DeleteAlert from "../DeleteAlert"

export default function RoleList(props) {
    const { roles, handleUpdate, editingRole, handleInputChange, handleEdit, handleDelete } = props

    const [nameRole, setNameRole] = useState('')

    const handleRoleEdit = (guid) => {
        const roleToEdit = roles.find((role) => role.guid === guid)
        setNameRole(roleToEdit.name)
    }

    const handleUpdateRole = async (data) => {
        const response = await checkRole(data.name)
        const validationDuplicateResult = ValidationDuplicate(data, nameRole, response)

        if (validationDuplicateResult) {
            ErrorAlert({ message: validationDuplicateResult })
            return
        } else {
            if ((response === 404) || nameRole === data.name) {
                try {
                    await handleUpdate(data)
                    SuccessAlert({ message: 'Update data successful.' })
                    return
                }
                catch (error) {
                    console.error('Error during update data:', error)
                    ErrorAlert({ message: 'Failed to update role. Please try again later.' })
                    return
                }
            }
        }
    }

    return (
        <div>
            <br></br>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(roles) && roles.length > 0 ? (
                        roles.map((data, index) => (
                            <tr key={index}>
                                <td>
                                    {editingRole === data.guid ? (
                                        <InputUpdate
                                            name="name"
                                            type="text"
                                            value={data.name}
                                            onChange={(e) => handleInputChange(data.guid, 'name', e.target.value)}
                                        />
                                    ) : (
                                        data.name
                                    )}
                                </td>
                                <td>
                                    {editingRole === data.guid ? (
                                        <Button
                                            name="Save"
                                            className="btn btn-success"
                                            onClick={() => handleUpdateRole(data)}
                                        />
                                    ) : (
                                        <>
                                            <Button
                                                name="Edit"
                                                className="btn btn-primary"
                                                onClick={() => {
                                                    handleRoleEdit(data.guid)
                                                    handleEdit(data.guid)
                                                }}
                                            />
                                            <Button
                                                name="Delete"
                                                className="btn btn-danger"
                                                onClick={() => DeleteAlert({ handleDelete, guid: data.guid })}
                                            />
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3">No role available.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}