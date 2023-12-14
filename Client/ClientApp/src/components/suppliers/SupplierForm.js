import React, { useState } from 'react'
import Input from '../Input'
import Button from '../Button'
import { SupplierValidation, ValidateData, StatusValidate } from '../../Validation/Suppliers/SupplierValidation'
import SuccessAlert from '../SuccessAlert'
import ErrorAlert from '../ErrorAlert'

export default function SupplierForm(props) {

    const { handleCreate, handleEmail, handlePhoneNumber, handleName } = props
    const [newSupplier, setNewSupplier] = useState({ name: '', address: '', email: '', phoneNumber: '' })

    const [errors, setErrors] = useState({})

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewSupplier({ ...newSupplier, [name]: value })
    }

    const handleCreateSupplier = async () => {
        const validationError = ValidateData(newSupplier)

        if (validationError) {
            ErrorAlert({ message: validationError })
            return
        }

        const nameStatus = await handleName(newSupplier.name)
        const emailStatus = await handleEmail(newSupplier.email)
        const phoneStatus = await handlePhoneNumber(newSupplier.phoneNumber)

        const validationStatus = StatusValidate(nameStatus, emailStatus, phoneStatus)

        if (validationStatus) {
            ErrorAlert({ message: validationStatus })
            return
        }

        try {
            await handleCreate(newSupplier)
            setNewSupplier({ name: '', address: '', email: '', phoneNumber: '' })
            SuccessAlert({ message: 'Add supplier successful.' })
        } catch (error) {
            console.error('Error during add:', error)
            ErrorAlert({ message: 'Failed to add supplier. Please try again later.' })
        }
        
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setErrors(SupplierValidation(newSupplier))
        handleCreateSupplier()
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
                        placeholder="Supplier Name"
                        value={newSupplier.name}
                        onChange={handleChange}
                        errors={errors.name}
                    />
                    <Input
                        name="address"
                        type="text"
                        placeholder="Address"
                        value={newSupplier.address}
                        onChange={handleChange}
                        errors={errors.address}
                    />
                    <Input
                        name="email"
                        type="text"
                        placeholder="Email"
                        value={newSupplier.email}
                        onChange={handleChange}
                        errors={errors.email}
                    />
                    <Input
                        name="phoneNumber"
                        type="text"
                        placeholder="Phone Number"
                        value={newSupplier.phoneNumber}
                        onChange={handleChange}
                        errors={errors.phoneNumber}
                    />
                    <Button
                        name="Add Supplier"
                        className="btn btn-primary"
                    />
                </form>
            </div>
        </div>
    );
}