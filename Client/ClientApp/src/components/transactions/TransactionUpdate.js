import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import Select from "../Select"
import Input from "../Input"
import Button from "../Button"
import { ValidateData } from "../../Validation/Transactions/TransactionValidation"
import ErrorAlert from "../ErrorAlert"
import SuccessAlert from "../SuccessAlert"

const TransactionUpdate = (props) => {

    const { handleUpdate, users, products, guid, prevTransactionQuantity, prevTransactionProduct, prevTransactionUser, handleGetTransactionById } = props

    const [updateTransaction, setUpdateTransaction] = useState({ productGuid: '', userGuid: '', quantity: '' })

    const navigate = useNavigate()

    const handleInputChange = (field, value) => {
        setUpdateTransaction({ ...updateTransaction, [field]: value });
    }

    const getUpdateTransaction = async (guid) => {
        try {
            const response = await handleGetTransactionById(guid)
            if (prevTransactionQuantity && prevTransactionProduct && prevTransactionUser) {
                setUpdateTransaction(response?.data?.data)
            }
        } catch (error) {
            ErrorAlert({ message: 'An unexpected error occurred.' })
        }
    }

    useEffect(() => {
        getUpdateTransaction(guid)
    }, [])

    const handleUpdateTransaction = async (data) => {
        const selectedProduct = products.find(product => product.guid === data.productGuid)

        const validationError = ValidateData(data)

        if (validationError) {
            ErrorAlert({ message: validationError })
            return
        }

        if ((prevTransactionQuantity === data.quantity && prevTransactionProduct === data.productGuid && prevTransactionUser === data.userGuid) || (prevTransactionProduct !== data.productGuid && selectedProduct.stock >= data.quantity)) {
            if (data.quantity < 1) {
                ErrorAlert({ message: 'Quantity must be greater than 1!' })
            }
            else {
                try {
                    await handleUpdate(data)
                    SuccessAlert({ message: 'Your transaction has been updated' })
                    navigate("/transaction")
                } catch (error) {
                    ErrorAlert({ message: 'Error updating stock!' })
                    console.error("Error updating stock:", error)
                }
            }
        } else {
            ErrorAlert({ message: 'Invalid product or insufficient stock.!' })
            console.log("Invalid product or insufficient stock.")
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        handleUpdateTransaction(updateTransaction)
    }

    return (
        <div className="row">
            <div className="col-lg-12" noValidate>
                <form
                    onSubmit={handleSubmit}
                    className="row g-3 needs-validation"
                >
                    <Select
                        name="productGuid"
                        label="Product"
                        value={updateTransaction.productGuid}
                        onChange={(e) => handleInputChange('productGuid', e.target.value)}
                        options={products}
                    />
                    <Select
                        name="userGuid"
                        label="User"
                        value={updateTransaction.userGuid}
                        onChange={(e) => handleInputChange('userGuid', e.target.value)}
                        options={users}
                    />
                    <Input
                        type="number"
                        value={updateTransaction.quantity}
                        onChange={(e) => handleInputChange('quantity', e.target.value)}
                    />
                    <Button
                        name="Save"
                        className="btn btn-success"
                    />
                </form>
            </div>
        </div>
    )
}

export default TransactionUpdate