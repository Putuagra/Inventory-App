import React, { useState } from 'react';

export default function TransactionForm({ handleCreate, products, users, handleUpdateStock }) {
    const [newTransaction, setNewTransaction] = useState({ productGuid: '', userGuid: '', quantity: '' })

    const handleChange = (e) => {
        const { name, value } = e.target
        setNewTransaction({ ...newTransaction, [name]: value })
    }

    const handleCreateTransaction = async () => {
        const selectedProduct = products.find(product => product.guid === newTransaction.productGuid)
        console.log(selectedProduct)

        if (selectedProduct && selectedProduct.stock >= newTransaction.quantity) {
            try {
                selectedProduct.stock -= newTransaction.quantity;

                await handleUpdateStock(selectedProduct);

                handleCreate(newTransaction);
                setNewTransaction({ productGuid: '', userGuid: '', quantity: '' });
            } catch (error) {
                console.error("Error updating stock:", error);
            }
        } else {
            console.log("Invalid product or insufficient stock.");
        }
        console.log(newTransaction)
    }

    return (
        <div>
            <div className="col-md-6">
                <select
                    name="productGuid"
                    value={newTransaction.productGuid}
                    onChange={handleChange}
                >
                    <option value="">Select Product</option>
                    {
                        products.map((product) => (
                            <option key={product.guid} value={product.guid}>
                                {product.name}
                            </option>
                        ))
                    }
                </select>
            </div>
            <div className="col-md-6">
                <select
                    name="userGuid"
                    value={newTransaction.userGuid}
                    onChange={handleChange}
                >
                    <option value="">Select User</option>
                    {
                        users.map((user) => (
                            <option key={user.guid} value={user.guid}>
                                {user.name}
                            </option>
                        ))
                    }
                </select>
            </div>
            <div className="col-md-6">
                <input
                    type="text"
                    placeholder="Quantity"
                    name="quantity"
                    value={newTransaction.quantity}
                    onChange={handleChange}
                />
            </div>
            <div className="col-md-6">
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                        handleCreateTransaction()
                    }}
                >
                    Add Transaction
                </button>
            </div>
        </div>
    )
}