import { useEffect, useState } from "react"
import { ValidateData, ValidationDuplicate } from "../../Validation/Products/ProductValidation"
import ErrorAlert from "../ErrorAlert"
import Input from "../Input"
import Select from "../Select"
import Button from "../Button"
import SuccessAlert from "../SuccessAlert"
import { useNavigate } from 'react-router-dom'

const ProductUpdate = (props) => {

    const { handleUpdate, handleGetProductById, handleCheckProduct, handleCategoryAvailability, suppliers, categories, prevProductName, prevProductSupplier, prevProductCategory, guid } = props

    const [updateProduct, setUpdateProduct] = useState({ name: '', stock: '', price: '', description: '', categoryGuid: '', supplierGuid: '' })

    const navigate = useNavigate()

    const getUpdateProduct = async (guid) => {
        try {
            const response = await handleGetProductById(guid)
            if (prevProductName && prevProductSupplier && prevProductCategory) {
                setUpdateProduct(response?.data?.data)
            }
        } catch (error) {
            ErrorAlert({ message: 'An unexpected error occurred.' })
        }
    }

    useEffect(() => {
        getUpdateProduct(guid)
    }, [])

    const handleInputChange = (field, value) => {
        setUpdateProduct({ ...updateProduct, [field]: value });
    }

    const handleUpdateProduct = async (data) => {
        const validationError = ValidateData(data)

        if (validationError) {
            ErrorAlert({ message: validationError })
            return
        }

        const status = await handleCheckProduct(data.name, data.supplierGuid, data.categoryGuid)
        const statusCategory = await handleCategoryAvailability(data.categoryGuid, data.supplierGuid)

        const validationDuplicate = ValidationDuplicate(data, prevProductName, prevProductSupplier, status, statusCategory)

        if (validationDuplicate) {
            ErrorAlert({ message: validationDuplicate })
            return
        }

        if ((status === 404 && statusCategory === 200 && prevProductName !== data.name) || (prevProductName === data.name && prevProductSupplier === data.supplierGuid && prevProductCategory === data.categoryGuid) || (prevProductName === data.name && status === 404 && statusCategory === 200)) {
            try {
                await handleUpdate(data)
                SuccessAlert({ message: 'Update product successful.' })
                navigate("/product")
            } catch (error) {
                console.error('Error during update:', error)
                ErrorAlert({ message: 'Failed to update product. Please try again later.' })
            }
        }
        else if (status === 200 && statusCategory === 200) {
            ErrorAlert({ message: 'The updated product already exists or is invalid' })
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        handleUpdateProduct(updateProduct)
    }

    return (
        <div className="row">
            <div className="col-lg-12" noValidate>
                <form
                    onSubmit={handleSubmit}
                    className="row g-3 needs-validation"
                >
                    <Input
                        type="text"
                        value={updateProduct.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                    />
                    <Select
                        name="supplierGuid"
                        value={updateProduct.supplierGuid}
                        onChange={(e) => handleInputChange('supplierGuid', e.target.value)}
                        options={suppliers}
                    />
                    <Select
                        name="categoryGuid"
                        value={updateProduct.categoryGuid}
                        onChange={(e) => handleInputChange('categoryGuid', e.target.value)}
                        options={categories.filter((category) => category.supplierGuid === updateProduct.supplierGuid)}
                    />
                    <Input
                        type="number"
                        value={updateProduct.stock}
                        onChange={(e) => handleInputChange('stock', e.target.value)}
                    />
                    <Input
                        type="number"
                        value={updateProduct.price}
                        onChange={(e) => handleInputChange('price', e.target.value)}
                    />
                    <Input
                        type="text"
                        value={updateProduct.description}
                        onChange={(e) => handleInputChange('price', e.target.value)}
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

export default ProductUpdate