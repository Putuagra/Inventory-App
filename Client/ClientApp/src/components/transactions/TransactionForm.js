import React, { useState } from 'react';
import Button from '../Button';
import Input from '../Input';
import Select from '../Select';

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
        <div className="row">
            <div className="col-lg-12" noValidate>
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        handleCreateTransaction()
                    }}
                    className="row g-3 needs-validation" 
                >
                    <Select
                        name="productGuid"
                        label="Product"
                        value={newTransaction.productGuid}
                        onChange={handleChange}
                        options={products}
                    />
                    <Select
                        name="userGuid"
                        label="User"
                        value={newTransaction.userGuid}
                        onChange={handleChange}
                        options={users}
                    />
                    <Input
                        name="quantity"
                        type="number"
                        placeholder="Quantity"
                        value={newTransaction.quantity}
                        onChange={handleChange}
                    />
                    <Button
                        name="Add Transaction"
                    />
                </form>
            </div>
        </div>
    )
}