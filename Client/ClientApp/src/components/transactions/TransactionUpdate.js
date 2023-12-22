import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import Select from "../Select"
import Input from "../Input"
import Button from "../Button"
import { ValidateData } from "../../Validation/Transactions/TransactionValidation"
import ErrorAlert from "../ErrorAlert"
import SuccessAlert from "../SuccessAlert"

const TransactionUpdate = (props) => {

    const { handleUpdate, users, products, guid, prevTransactionQuantity, prevTransactionProduct, handleGetTransactionById } = props

    const [updateTransaction, setUpdateTransaction] = useState({ productGuid: '', userGuid: '', quantity: '' })

    const navigate = useNavigate()

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setUpdateTransaction({ ...updateTransaction, [name]: value })
    }

    const getUpdateTransaction = async (guid) => {
        try {
            const response = await handleGetTransactionById(guid)
            if (prevTransactionQuantity && prevTransactionProduct) {
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

        const stockSameProduct = selectedProduct.stock + prevTransactionQuantity - data.quantity
        const stockDifProduct = selectedProduct.stock - data.quantity

        if ((stockSameProduct >= 0 && data.quantity > 0 && prevTransactionProduct === data.productGuid) || (stockDifProduct >= 0 && data.quantity > 0 && prevTransactionProduct !== data.productGuid)) {
            try {
                await handleUpdate(data)
                SuccessAlert({ message: 'Your transaction has been updated' })
                navigate("/transaction")
            } catch (error) {
                ErrorAlert({ message: 'Error updating stock!' })
                console.error("Error updating stock:", error)
            }
        } else {
            ErrorAlert({ message: 'Invalid product or insufficient stock!' })
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
                        onChange={handleInputChange}
                        options={products}
                    />
                    <Select
                        name="userGuid"
                        label="User"
                        value={updateTransaction.userGuid}
                        onChange={handleInputChange}
                        options={users}
                    />
                    <Input
                        name="quantity"
                        type="number"
                        value={updateTransaction.quantity}
                        onChange={handleInputChange}
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