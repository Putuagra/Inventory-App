import React from 'react';

export default function CategoryList({ categories, suppliers, editingCategory, handleEdit, handleInputChange, handleUpdate, handleDelete }) {
    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Category Name</th>
                    <th>Supplier</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {Array.isArray(categories) && categories.length > 0 ? (
                    categories.map((data, index) => (
                        <tr key={index}>
                            <td>
                                {editingCategory === data.guid ? (
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
                                {editingCategory === data.guid ? (
                                    <select
                                        value={data.supplierGuid || ''}
                                        onChange={(e) => handleInputChange(data.guid, 'supplierGuid', e.target.value)}
                                    >
                                        <option value="">Select Supplier</option>
                                        {suppliers.map((supplier) => (
                                            <option key={supplier.guid} value={supplier.guid}>
                                                {supplier.name}
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    (suppliers.find((supplier) => supplier.guid === data.supplierGuid) || {}).name
                                )}
                            </td>
                            <td>
                                {editingCategory === data.guid ? (
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