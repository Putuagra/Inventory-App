import React, { useState } from 'react'
import InputUpdate from '../InputUpdate'
import Button from '../Button'
import SuccessAlert from '../SuccessAlert'
import ErrorAlert from '../ErrorAlert'
import DeleteAlert from '../DeleteAlert'
import { ValidateData, ValidationDuplicate } from '../../Validation/Suppliers/SupplierValidation'

export default function SupplierList() {

    const { suppliers, editingSupplier, handleEdit, handleInputChange, handleUpdate, handleDelete, handleEmail, handlePhoneNumber, handleName } = props
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [name, setName] = useState('')

    const handleEmailEdit = (guid) => {
        const supplierToEdit = suppliers.find((supplier) => supplier.guid === guid)
        setEmail(supplierToEdit.email)
    }

    const handlePhoneNumberEdit = (guid) => {
        const supplierToEdit = suppliers.find((supplier) => supplier.guid === guid)
        setPhoneNumber(supplierToEdit.phoneNumber)
    }

    const handleNameEdit = (guid) => {
        const supplierToEdit = suppliers.find((supplier) => supplier.guid === guid)
        setName(supplierToEdit.name)
    }

    const handleUpdateSupplier = async (data) => {

        const validationError = ValidateData(data)

        if (validationError) {
            ErrorAlert({ message: validationError })
            return
        }

        const emailStatus = await handleEmail(data.email)
        const phoneStatus = await handlePhoneNumber(data.phoneNumber)
        const nameStatus = await handleName(data.name)

        const validationDuplicateResult = ValidationDuplicate(data, name, email, phoneNumber, emailStatus, phoneStatus, nameStatus)

        if (validationDuplicateResult) {
            ErrorAlert({ message: validationDuplicateResult })
            return
        } else {
            if ((emailStatus === 404 && phoneStatus === 404 && nameStatus === 404) || email === data.email || phoneNumber === data.phoneNumber || name === data.name) {
                try {
                    await handleUpdate(data)
                    SuccessAlert({ message: 'Update data successful.' })
                    return
                } catch (error) {
                    console.error('Error during update data:', error)
                    ErrorAlert({ message: 'Failed to update supplier. Please try again later.' })
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
                        <th>Email</th>
                        <th>Address</th>
                        <th>Phone Number</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(suppliers) && suppliers.length > 0 ? (
                        suppliers.map((data, index) => (
                            <tr key={index}>
                                <td>
                                    {editingSupplier === data.guid ? (
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
                                    {editingSupplier === data.guid ? (
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
                                    {editingSupplier === data.guid ? (
                                        <InputUpdate
                                            name="address"
                                            type="text"
                                            value={data.address}
                                            onChange={(e) => handleInputChange(data.guid, 'address', e.target.value)}
                                        />
                                    ) : (
                                        data.address
                                    )}
                                </td>
                                <td>
                                    {editingSupplier === data.guid ? (
                                        <InputUpdate
                                            name="phoneNumber"
                                            type="text"
                                            value={data.phoneNumber}
                                            onChange={(e) => handleInputChange(data.guid, 'phoneNumber', e.target.value)}
                                        />
                                    ) : (
                                        data.phoneNumber
                                    )}
                                </td>
                                <td>
                                    {editingSupplier === data.guid ? (
                                        <Button
                                            name="Save"
                                            className="btn btn-success"
                                            onClick={() => handleUpdateSupplier(data)}
                                        />
                                    ) : (
                                        <>
                                            <Button
                                                name="Edit"
                                                className="btn btn-primary"
                                                onClick={() => {
                                                    handleEmailEdit(data.guid)
                                                    handlePhoneNumberEdit(data.guid)
                                                    handleNameEdit(data.guid)
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
                            <td colSpan="3">No supplier available.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>    
    )
}