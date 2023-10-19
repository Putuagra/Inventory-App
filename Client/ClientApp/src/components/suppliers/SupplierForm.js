import React, { useState } from 'react';
import Input from '../Input';
import Button from '../Button';
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import SupplierValidation from '../../Validation/SupplierValidation';

export default function SupplierForm({ handleCreate }) {
    const [newSupplier, setNewSupplier] = useState({ name: '', address: '', email: '', phoneNumber: '' });

    const [errors, setErrors] = useState({})

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewSupplier({ ...newSupplier, [name]: value });
    };

    const handleCreateSupplier = async () => {
        const namePattern = /^[a-zA-Z0-9]+$/
        const addressPattern = /^[a-zA-Z0-9\s]+$/
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
        const phoneNumberPattern = /^\+[1-9]\d{1,20}$/
        const apiUrl = 'https://localhost:7020/api'
        if (!newSupplier.name || !newSupplier.email || !newSupplier.address || !newSupplier.phoneNumber) {
            return;
        }

        if (!namePattern.test(newSupplier.name) ||
            !emailPattern.test(newSupplier.email) ||
            !addressPattern.test(newSupplier.address) ||
            !phoneNumberPattern.test(newSupplier.phoneNumber)
        ) {
            return;
        }

        try {
            const responseEmail = await axios.get(`${apiUrl}/Supplier/ByEmail/${newSupplier.email}`);

            if (responseEmail.status === 200) {
                alert('Email already exists. Please use a different email.');
                return;
            }
        } catch {
            console.log('Something went wrong with the email response.');
        }

        try {
            const responsePhone = await axios.get(`${apiUrl}/Supplier/ByPhone/${newSupplier.phoneNumber}`);

            if (responsePhone.status === 200) {
                alert('Phone number already exists.');
                return;
            }
        } catch {
            console.log('Something went wrong with the phone response.');
        }
       
        handleCreate(newSupplier);
        setNewSupplier({ name: '', address: '', email: '', phoneNumber: '' });
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
                    />
                </form>
            </div>
        </div>
    );
}