import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../Button'
import Input from '../Input'
import Select from '../Select'
import SuccessAlert from '../SuccessAlert'
import ErrorAlert from '../ErrorAlert'
import { TransactionValidation } from '../../Validation/Transactions/TransactionValidation'
import { GetAuth, GetTokenClaim } from '../Auth'

export default function TransactionForm(props) {

    const { handleCreate, products, users, handleUpdateStock } = props
    const [newTransaction, setNewTransaction] = useState({ productGuid: '', userGuid: '', quantity: '' })

    const [errors, setErrors] = useState({})

    const navigate = useNavigate()
    const token = GetAuth()
    const decode = GetTokenClaim(token)
    const rolesClaim = decode["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]

    const filteredUsers = users.filter(user => user.guid === decode.Guid)

    const handleChange = (e) => {
        const { name, value } = e.target
        setNewTransaction({ ...newTransaction, [name]: value })
    }

    const handleCreateTransaction = async () => {
        const selectedProduct = products.find(product => product.guid === newTransaction.productGuid)

        if (selectedProduct && selectedProduct.stock >= newTransaction.quantity) {
            try {
                if (newTransaction.quantity < 1) {
                    ErrorAlert({ message: 'Quantity must be greater than 1!' })
                } else {
                    selectedProduct.stock -= newTransaction.quantity

                    await handleUpdateStock(selectedProduct)

                    await handleCreate(newTransaction)
                    setNewTransaction({ productGuid: '', userGuid: '', quantity: '' })
                    SuccessAlert({ message: 'Your transaction has been successfully' })
                    navigate('/transaction')
                }   
            } catch (error) {
                ErrorAlert({ message: 'Error updating stock!' })
                console.error("Error updating stock:", error)
            }
        } else {
            ErrorAlert({ message: 'Invalid product or insufficient stock.!' })
            console.log("Invalid product or insufficient stock.")
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
                    {rolesClaim.includes("Admin") ? (
                    <Select
                        name="userGuid"
                        label="User"
                        value={newTransaction.userGuid}
                        onChange={handleChange}
                        options={users}
                    />
                    ) : <Select
                        name="userGuid"
                        label="User"
                        value={newTransaction.userGuid}
                        onChange={handleChange}
                        options={filteredUsers}
                    />}
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