import React, { useState } from 'react';
import Input from '../Input';
import Button from '../Button';

export default function SupplierForm({ handleCreate }) {
    const [newSupplier, setNewSupplier] = useState({ name: '', address: '', email: '', phoneNumber: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewSupplier({ ...newSupplier, [name]: value });
    };

    return (
        <div className="row">
            <div className="col-lg-12" noValidate>
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        handleCreate(newSupplier);
                        setNewSupplier({ name: '', address: '', email: '', phoneNumber: '' });
                    }}
                    className="row g-3 needs-validation"
                >
                    <Input
                        name="name"
                        type="text"
                        placeholder="Supplier Name"
                        value={newSupplier.name}
                        onChange={handleChange}
                    />
                    <Input
                        name="address"
                        type="text"
                        placeholder="Address"
                        value={newSupplier.address}
                        onChange={handleChange}
                    />
                    <Input
                        name="email"
                        type="text"
                        placeholder="Email"
                        value={newSupplier.email}
                        onChange={handleChange}
                    />
                    <Input
                        name="phoneNumber"
                        type="text"
                        placeholder="Phone Number"
                        value={newSupplier.phoneNumber}
                        onChange={handleChange}
                    />
                    <Button
                        name="Add Supplier"
                    />
                </form>
            </div>
        </div>
    );
}