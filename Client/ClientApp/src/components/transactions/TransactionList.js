import React from 'react'
import Button from '../Button'
import Input from '../Input'
import Select from '../Select'
import SuccessAlert from '../SuccessAlert'
import ErrorAlert from '../ErrorAlert'

const cardStyle = {
    maxWidth: '18rem',
}

export default function TransactionList({ products, users, transactions, editingTransaction, handleEdit, handleInputChange, handleUpdate, handleDelete }) {

    const handleUpdateTransaction = async (data) => {
        const selectedProduct = products.find(product => product.guid === data.productGuid)

        if (!data.quantity) {
            ErrorAlert({ message: 'Quantity harus diisi.' })
            return
        }
        if (selectedProduct.stock >= data.quantity) {
            if (data.quantity < 1) {
                ErrorAlert({ message: 'Quantity must be greater than 1!' });
            }
            else {
                try {
                    await handleUpdate(data)
                    SuccessAlert({ message: 'Your transaction has been updated' });
                } catch (error) {
                    ErrorAlert({ message: 'Error updating stock!' });
                    console.error("Error updating stock:", error);
                }
            } 
        } else {
            ErrorAlert({ message: 'Invalid product or insufficient stock.!' });
            console.log("Invalid product or insufficient stock.");
        }
    }

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
                                            <Select
                                                name="productGuid"
                                                label="Product"
                                                value={data.productGuid || ''}
                                                onChange={(e) => handleInputChange(data.guid, 'productGuid', e.target.value)}
                                                options={products}
                                            />
                                        ) : (
                                                (products.find((product) => product.guid === data.productGuid) || {}).name
                                        )
                                    }
                                </h5>
                                <h6 className="card-text">
                                    {
                                        editingTransaction === data.guid ? (
                                            <Select
                                                name="userGuid"
                                                label="User"
                                                value={data.userGuid || ''}
                                                onChange={(e) => handleInputChange(data.guid, 'userGuid', e.target.value)}
                                                options={users}
                                            />
                                        ) : (
                                                (users.find((user) => user.guid === data.userGuid) || {}).name
                                        )
                                    }
                                </h6>
                                <h6 className="card-text">
                                    Quantity: 
                                    {
                                        editingTransaction === data.guid ? (
                                            <Input
                                                name="quantity"
                                                type="number"
                                                placeholder="Quantity"
                                                value={data.quantity}
                                                onChange={(e) => handleInputChange(data.guid, 'quantity', e.target.value)}
                                            />
                                        ) : (
                                            data.quantity
                                        )
                                    }
                                </h6>
                                <h6 className="card-text">
                                    Price: 
                                    {
                                        (products.find((product) => product.guid === data.productGuid) || {}).price * data.quantity
                                    }
                                </h6>
                                {editingTransaction === data.guid ? (
                                    <Button
                                        name="Save" 
                                        className="btn btn-success"
                                        onClick={() => handleUpdateTransaction(data)}
                                    />
                                ) : (
                                        <>
                                            <Button
                                                name="Edit"
                                                className="btn btn-primary"
                                                onClick={() => {
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
                            </div>
                        </div>
                    )
                ) : (
                    <h5>No transactions available.</h5>
                )
            }     
        </div>
    )
}