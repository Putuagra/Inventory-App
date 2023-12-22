import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import { ValidateData, ValidationDuplicate } from "../../Validation/Categories/CategoryValidation"
import ErrorAlert from "../ErrorAlert"
import SuccessAlert from "../SuccessAlert"
import Input from "../Input"
import Select from "../Select"
import Button from "../Button"

const CategoryUpdate = (props) => {

    const { guid, suppliers, prevCategoryName, handleUpdate, handleGetCategoryById, handleDuplicate } = props

    const [updateCategory, setUpdateCategory] = useState({ name: '', supplierGuid: '' })

    const navigate = useNavigate()

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdateCategory({ ...updateCategory, [name]: value })
    }

    const getUpdateCategory = async (guid) => {
        try {
            const response = await handleGetCategoryById(guid)
            if (prevCategoryName) {
                setUpdateCategory(response?.data?.data)
            }
        } catch (error) {
            ErrorAlert({ message: 'An unexpected error occurred.' })
        }
    }

    const handleUpdateCategory = async (data) => {
        const validationError = ValidateData(data)

        if (validationError) {
            ErrorAlert({ message: validationError })
            return
        }

        const status = await handleDuplicate(data.name, data.supplierGuid)
        const validationDuplicateResult = ValidationDuplicate(data, status, prevCategoryName)

        if (validationDuplicateResult) {
            ErrorAlert({ message: validationDuplicateResult })
            return
        } else {
            if (status === 404 || prevCategoryName === data.name) {
                try {
                    await handleUpdate(data)
                    SuccessAlert({ message: 'Update category successful.' })
                    navigate("/category")
                } catch (error) {
                    console.error('Error during update:', error)
                    ErrorAlert({ message: 'Failed to update category. Please try again later.' })
                }
            }
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        handleUpdateCategory(updateCategory)
    }

    useEffect(() => {
        getUpdateCategory(guid)
    }, [])

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
                        value={updateCategory.name}
                        onChange={handleInputChange}
                    />
                    <Select
                        name="supplierGuid"
                        value={updateCategory.supplierGuid}
                        onChange={handleInputChange}
                        options={suppliers}
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

export default CategoryUpdate