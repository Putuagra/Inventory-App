import React from 'react';

export default function SupplierList({ suppliers, editingSupplier, handleEdit, handleInputChange, handleUpdate, handleDelete }) {
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
                                    <input
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
                                    <input
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
                                    <input
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
                                    <input
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
                                    <button
                                        type="button"
                                        className="btn btn-success"
                                        onClick={() => handleUpdate(data)}
                                    >
                                        Save
                                    </button>
                                ) : (
                                    <>
                                        <button
                                            type="button"
                                            className="btn btn-primary"
                                            onClick={() => handleEdit(data.guid)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-danger"
                                            onClick={() => handleDelete(data.guid)}
                                        >
                                            Delete
                                        </button>
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