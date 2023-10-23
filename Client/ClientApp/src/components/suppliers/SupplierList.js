import React, { useState } from 'react'
import InputUpdate from '../InputUpdate'
import Button from '../Button'
import SuccessAlert from '../SuccessAlert'
import ErrorAlert from '../ErrorAlert'

export default function SupplierList({ suppliers, editingSupplier, handleEdit, handleInputChange, handleUpdate, handleDelete, handleEmail, handlePhoneNumber }) {

    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const handleEmailEdit = (guid) => {
        const supplierToEdit = suppliers.find((supplier) => supplier.guid === guid);
        setEmail(supplierToEdit.email);
    };

    const handlePhoneNumberEdit = (guid) => {
        const supplierToEdit = suppliers.find((supplier) => supplier.guid === guid);
        setPhoneNumber(supplierToEdit.phoneNumber);
    };

    const handleUpdateSupplier = async (data) => {
        const namePattern = /^[a-zA-Z0-9]+$/
        const addressPattern = /^[a-zA-Z0-9\s]+$/
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        const phoneNumberPattern = /^\+[1-9]\d{1,20}$/

        if (data.name === '' && data.email === '' && data.address === '' && data.phoneNumber === '') {
            ErrorAlert({ message: 'Semua field harus diisi.' });
            return
        }

        if (data.name === '') {
            ErrorAlert({ message: 'Nama harus diisi.' });
            return
        } else if (!namePattern.test(data.name)) {
            ErrorAlert({ message: 'Invalid format name.' });
            return
        }

        if (data.email === '') {
            ErrorAlert({ message: 'Email harus diisi.' });
            return;
        } else if (!emailPattern.test(data.email)) {
            ErrorAlert({ message: 'Invalid format email.' });
            return
        }

        if (data.address === '') {
            ErrorAlert({ message: 'Address harus diisi.' });
            return;
        } else if (!addressPattern.test(data.address)) {
            ErrorAlert({ message: 'Invalid format address.' });
            return
        }

        if (data.phoneNumber === '') {
            ErrorAlert({ message: 'Phone number harus diisi.' });
            return;
        } else if (!phoneNumberPattern.test(data.phoneNumber)) {
            ErrorAlert({ message: 'Invalid format phone number.' });
            return
        }

        const emailStatus = await handleEmail(data.email);
        const phoneStatus = await handlePhoneNumber(data.phoneNumber);

        if (emailStatus === 200 && email !== data.email) {
            ErrorAlert({ message: 'Email already exists. Please use a different email.' })
        } else {
            ErrorAlert({ message: 'Failed to check email availability. Please try again later.' })
        }

        if (phoneStatus === 200 && phoneNumber !== data.phoneNumber) {
            ErrorAlert({ message: 'Phone number already exists. Please use a different number.' })
        } else {
            ErrorAlert({ message: 'Failed to check phone number availability. Please try again later.' })
        }

        if ((emailStatus === 404 && phoneStatus === 404) || email === data.email || phoneNumber === data.phoneNumber) {
            try {
                await handleUpdate(data)
                SuccessAlert({ message: 'Update data successful.' });
            } catch (error) {
                console.error('Error during update data:', error);
                ErrorAlert({ message: 'Failed to update supplier. Please try again later.' });
            }
        }
    }

    return (
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
                                                    handleEdit(data.guid)
                                                }}
                                            />
                                            <Button
                                                name="Delete"
                                                className="btn btn-danger"
                                                onClick={() => handleDelete(data.guid)}
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
    );
}