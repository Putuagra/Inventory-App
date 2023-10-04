import React from 'react'

const cardStyle = {
    maxWidth: '18rem',
}

export default function TransactionList({ products, users, transactions, editingTransaction, handleEdit, handleInputChange, handleUpdate, handleDelete }) {
    return (
        <div className="card-container">
            {
                Array.isArray(transactions) && transactions.length > 0 ? (
                    transactions.map((data, index) =>
                        <div key={index} className="card text-bg-light mb-3" style={cardStyle}>
                            <div className="card-header">Transaction</div>
                            <div className="card-body">
                                <h5 className="card-title">
                                    {
                                        editingTransaction === data.guid ? (
                                            <select
                                                value={data.productGuid || ''}
                                                onChange={(e) => handleInputChange(data.guid, 'productGuid', e.target.value)}
                                            >
                                                <option value="">Select Product</option>
                                                {products.map((product) => (
                                                    <option key={product.guid} value={product.guid}>
                                                        {product.name}
                                                    </option>
                                                ))}
                                            </select>
                                        ) : (
                                                (products.find((product) => product.guid === data.productGuid) || {}).name
                                        )
                                    }
                                </h5>
                                <p className="card-text">
                                    {
                                        editingTransaction === data.guid ? (
                                            <select
                                                value={data.userGuid || ''}
                                                onChange={(e) => handleInputChange(data.guid, 'userGuid', e.target.value)}
                                            >
                                                <option value="">Select User</option>
                                                {users.map((user) => (
                                                    <option key={user.guid} value={user.guid}>
                                                        {user.name}
                                                    </option>
                                                ))}
                                            </select>
                                        ) : (
                                                (users.find((user) => user.guid === data.userGuid) || {}).name
                                        )
                                    }
                                </p>
                                <p className="card-text">
                                    Quantity: 
                                    {
                                        editingTransaction === data.guid ? (
                                            <input
                                                type="text"
                                                value={data.quantity}
                                                onChange={(e) => handleInputChange(data.guid, 'quantity', e.target.value)}
                                            />
                                        ) : (
                                            data.quantity
                                        )
                                    }
                                </p>
                                <p className="card-text">
                                    Price: 
                                    {
                                        (products.find((product) => product.guid === data.productGuid) || {}).price * data.quantity
                                    }
                                </p>
                                {editingTransaction === data.guid ? (
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
                            </div>
                        </div>
                    )
                ) : (
                    <p>No transactions available.</p>
                )
            }     
        </div>
    )
}