import React, { useState } from 'react';
import Button from '../Button';
import Input from '../Input';
import Select from '../Select';
import TransactionValidation from '../../Validation/TransactionValidation';
import Swal from 'sweetalert2'

export default function TransactionForm({ handleCreate, products, users, handleUpdateStock }) {
    const [newTransaction, setNewTransaction] = useState({ productGuid: '', userGuid: '', quantity: '' })

    const [errors, setErrors] = useState({})

    const handleChange = (e) => {
        const { name, value } = e.target
        setNewTransaction({ ...newTransaction, [name]: value })
    }

    const handleCreateTransaction = async () => {
        const selectedProduct = products.find(product => product.guid === newTransaction.productGuid)

        if (selectedProduct && selectedProduct.stock >= newTransaction.quantity) {
            try {
                if (newTransaction.quantity < 1) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Quantity must be greater than 1!',
                    })
                } else {
                    selectedProduct.stock -= newTransaction.quantity;

                    await handleUpdateStock(selectedProduct);

                    handleCreate(newTransaction);
                    setNewTransaction({ productGuid: '', userGuid: '', quantity: '' });
                    Swal.fire({
                        icon: 'success',
                        title: 'Your transaction has been successfully',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }   
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Error updating stock!',
                })
                console.error("Error updating stock:", error);
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Invalid product or insufficient stock.!',
            })
            console.log("Invalid product or insufficient stock.");
        }
    }

    const handleValidation = (e) => {
        e.preventDefault()
        setErrors(TransactionValidation(newTransaction))
        handleCreateTransaction()
    }

    return (
        <div className="row">
            <div className="col-lg-12" noValidate>
                <form
                    onSubmit={handleValidation}
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
                        errors={errors.quantity}
                    />
                    <Button
                        name="Add Transaction"
                        className="btn btn-primary"
                    />
                </form>
            </div>
        </div>
    )
}