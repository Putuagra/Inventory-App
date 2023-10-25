import React, { useState } from 'react'
import Input from '../Input'
import Button from '../Button'
import SupplierValidation from '../../Validation/SupplierValidation'
import SuccessAlert from '../SuccessAlert'
import ErrorAlert from '../ErrorAlert'

export default function SupplierForm({ handleCreate, handleEmail, handlePhoneNumber }) {
    const [newSupplier, setNewSupplier] = useState({ name: '', address: '', email: '', phoneNumber: '' })

    const [errors, setErrors] = useState({})

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewSupplier({ ...newSupplier, [name]: value })
    }

    const handleCreateSupplier = async () => {
        const namePattern = /^[a-zA-Z0-9]+$/
        const addressPattern = /^[a-zA-Z0-9\s]+$/
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
        const phoneNumberPattern = /^\+[1-9]\d{1,20}$/
        if (!newSupplier.name || !newSupplier.email || !newSupplier.address || !newSupplier.phoneNumber) {
            return
        }

        if (!namePattern.test(newSupplier.name) ||
            !emailPattern.test(newSupplier.email) ||
            !addressPattern.test(newSupplier.address) ||
            !phoneNumberPattern.test(newSupplier.phoneNumber)
        ) {
            return
        }

        const emailStatus = await handleEmail(newSupplier.email);
        if (emailStatus === 200) {
            ErrorAlert({ message: 'Email already exists. Please use a different email.' })
            return
        }

        const phoneStatus = await handlePhoneNumber(newSupplier.phoneNumber);
        if (phoneStatus === 200) {
            ErrorAlert({ message: 'Phone number already exists. Please use a different number.' })
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