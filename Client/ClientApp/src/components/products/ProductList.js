import React from 'react';

export default function ProductList({ products, categories, suppliers, editingProduct, handleEdit, handleInputChange, handleUpdate, handleDelete }) {
    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Product Name</th>
                    <th>Supplier</th>
                    <th>Category</th>
                    <th>Stock</th>
                    <th>Price</th>
                    <th>Description</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    Array.isArray(products) && products.length > 0 ? (
                        products.map((data, index) => (
                            <tr key={index}>
                                <td>
                                    {
                                        editingProduct === data.guid ? (
                                            <input
                                                type="text"
                                                value={data.name}
                                                onChange={(e) => handleInputChange(data.guid, 'name', e.target.value)}
                                            />
                                        ) : (
                                            data.name
                                        )
                                    }
                                </td>
                                <td>
                                    {
                                        editingProduct === data.guid ? (
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
                                        )
                                    }
                                </td>
                                <td>
                                    {
                                        editingProduct === data.guid ? (
                                            <select
                                                value={data.categoryGuid || ''}
                                                onChange={(e) => handleInputChange(data.guid, 'categoryGuid', e.target.value)}
                                            >
                                                <option value="">Select Category</option>
                                                {
                                                    categories.filter((category) => category.supplierGuid === data.supplierGuid)
                                                        .map((category) => (
                                                            <option key={category.guid} value={category.guid}>
                                                                {category.name}
                                                            </option>
                                                        ))
                                                }
                                            </select>
                                        ) : (
                                            (categories.find((category) => category.guid === data.categoryGuid) || {}).name
                                        )
                                    }
                                </td>
                                <td>
                                    {
                                        editingProduct === data.guid ? (
                                            <input
                                                type="text"
                                                value={data.stock}
                                                onChange={(e) => handleInputChange(data.guid, 'stock', e.target.value)}
                                            />
                                        ) : (
                                            data.stock
                                        )
                                    }
                                </td>
                                <td>
                                    {
                                        editingProduct === data.guid ? (
                                            <input
                                                type="text"
                                                value={data.price}
                                                onChange={(e) => handleInputChange(data.guid, 'price', e.target.value)}
                                            />
                                        ) : (
                                            data.price
                                        )
                                    }
                                </td>
                                <td>
                                    {
                                        editingProduct === data.guid ? (
                                            <input
                                                type="text"
                                                value={data.description}
                                                onChange={(e) => handleInputChange(data.guid, 'description', e.target.value)}
                                            />
                                        ) : (
                                            data.description
                                        )
                                    }
                                </td>
                                <td>
                                    {editingProduct === data.guid ? (
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
                        )
                        )
                    ) : (
                        <tr>
                            <td colSpan="3">No user data available.</td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    )
}