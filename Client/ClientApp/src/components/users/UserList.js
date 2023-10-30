import React, { useState } from 'react'
import InputUpdate from '../InputUpdate'
import Button from '../Button'
import SuccessAlert from '../SuccessAlert'
import ErrorAlert from '../ErrorAlert'
import DeleteAlert from '../DeleteAlert'
import { ValidateData, ValidationDuplicate } from '../../Validation/Users/UserValidation'

export default function UserList({ users, editingUser, handleEdit, handleInputChange, handleUpdate, handleDelete, handleCheckEmail }) {

    const [email, setEmail] = useState('')

    const handleEmailEdit = (guid) => {
        const userToEdit = users.find((user) => user.guid === guid);
        setEmail(userToEdit.email)
    }

    const handleUpdateUser = async (data) => {
        const validationError = ValidateData(data)

        if (validationError) {
            ErrorAlert({ message: validationError })
            return
        }

        const emailStatus = await handleCheckEmail(data.email)
        const validateDuplicate = ValidationDuplicate(data, emailStatus, email)
        if (validateDuplicate) {
            ErrorAlert({ message: validateDuplicate })
            return
        } else if (emailStatus === 404 || email === data.email) { 
            try {
                await handleUpdate(data)
                SuccessAlert({ message: 'Update data successful.' })
            } catch (error) {
                console.error('Error during update data:', error);
                ErrorAlert({ message: 'Failed to update user. Please try again later.' })
            }
        } else {
            ErrorAlert({ message: 'Failed to check email availability. Please try again later.' })
        }  
    }
    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {Array.isArray(users) && users.length > 0 ? (
                    users.map((data, index) => (
                        <tr key={index}>
                            <td>
                                {editingUser === data.guid ? (
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
                            <td>{
                                editingUser === data.guid ? (
                                    <InputUpdate
                                        name="email"
                                        type="text"
                                        value={data.email}
                                        onChange={(e) => handleInputChange(data.guid, 'email', e.target.value)}
                                    />
                                ) : (
                                    data.email
                                )}
                            </td>
                            <td>
                                {editingUser === data.guid ? (
                                    <Button
                                        name="Save" 
                                        className="btn btn-success"
                                        onClick={() => handleUpdateUser(data)}
                                    />
                                ) : (
                                        <>
                                            <Button
                                                name="Edit"
                                                className="btn btn-primary"
                                                onClick={() => {
                                                    handleEmailEdit(data.guid)
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
                        <td colSpan="3">No user data available.</td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}