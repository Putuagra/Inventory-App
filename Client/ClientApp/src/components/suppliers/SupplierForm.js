import React, { useState } from 'react';

export default function SupplierForm({ handleCreate }) {
    const [newSupplier, setNewSupplier] = useState({ name: '', address: '', email: '', phoneNumber: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewSupplier({ ...newSupplier, [name]: value });
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Name"
                name="name"
                value={newSupplier.name}
                onChange={handleChange}
            />
            <input
                type="text"
                placeholder="Address"
                name="address"
                value={newSupplier.address}
                onChange={handleChange}
            />
            <input
                type="text"
                placeholder="Email"
                name="email"
                value={newSupplier.email}
                onChange={handleChange}
            />
            <input
                type="text"
                placeholder="PhoneNumber"
                name="phoneNumber"
                value={newSupplier.phoneNumber}
                onChange={handleChange}
            />
            <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                    handleCreate(newSupplier);
                    setNewSupplier({ name: '', address: '', email: '', phoneNumber: '' });
                }}
            >
                Add User
            </button>
        </div>
    );
}