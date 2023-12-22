import { useNavigate } from 'react-router-dom'
import { ValidateData, ValidationDuplicate } from '../../Validation/Suppliers/SupplierValidation'
import ErrorAlert from '../ErrorAlert'
import SuccessAlert from '../SuccessAlert'
import Input from '../Input'
import Button from '../Button'
import { useEffect, useState } from 'react'

const SupplierUpdate = (props) => {

    const { handleEmail, handlePhoneNumber, handleName, handleUpdate, handleGetSupplierById, guid, prevSupplierName, prevSupplierEmail, prevSupplierPhoneNumber } = props

    const navigate = useNavigate()

    const [updateSupplier, setUpdateSupplier] = useState({ name: '', address: '', email: '', phoneNumber: '' })

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdateSupplier({ ...updateSupplier, [name]: value })
    }

    const getUpdateSupplier = async (guid) => {
        try {
            const response = await handleGetSupplierById(guid)
            if (prevSupplierName && prevSupplierEmail && prevSupplierPhoneNumber) {
                setUpdateSupplier(response?.data?.data)
            }
        } catch (error) {
            ErrorAlert({ message: 'An unexpected error occurred.' })
        }
    }

    useEffect(() => {
        getUpdateSupplier(guid)
    }, [])

    const handleUpdateSupplier = async (data) => {

        const validationError = ValidateData(data)

        if (validationError) {
            ErrorAlert({ message: validationError })
            return
        }

        const emailStatus = await handleEmail(data.email)
        const phoneStatus = await handlePhoneNumber(data.phoneNumber)
        const nameStatus = await handleName(data.name)

        const validationDuplicateResult = ValidationDuplicate(data, prevSupplierName, prevSupplierEmail, prevSupplierPhoneNumber, emailStatus, phoneStatus, nameStatus)

        if (validationDuplicateResult) {
            ErrorAlert({ message: validationDuplicateResult })
            return
        } else {
            if ((emailStatus === 404 && phoneStatus === 404 && nameStatus === 404) || prevSupplierEmail === data.email || prevSupplierPhoneNumber === data.phoneNumber || prevSupplierName === data.name) {
                try {
                    await handleUpdate(data)
                    SuccessAlert({ message: 'Update data successful.' })
                    navigate("/supplier")
                } catch (error) {
                    console.error('Error during update data:', error)
                    ErrorAlert({ message: 'Failed to update supplier. Please try again later.' })
                }
            }
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        handleUpdateSupplier(updateSupplier)
    }

    return (
        <div className="row">
            <div className="col-lg-12" noValidate>
                <form
                    onSubmit={handleSubmit}
                    className="row g-3 needs-validation"
                >
                    <Input
                        name="name"
                        type="text"
                        value={updateSupplier.name}
                        onChange={handleInputChange}
                    />
                    <Input
                        name="address"
                        type="text"
                        value={updateSupplier.address}
                        onChange={handleInputChange}
                    />
                    <Input
                        name="email"
                        type="text"
                        value={updateSupplier.email}
                        onChange={handleInputChange}
                    />
                    <Input
                        name="phoneNumber"
                        type="text"
                        value={updateSupplier.phoneNumber}
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

export default SupplierUpdate