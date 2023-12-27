import { useEffect, useState } from "react"
import { ValidateData, ValidationDuplicate } from "../../Validation/Products/ProductValidation"
import ErrorAlert from "../ErrorAlert"
import Input from "../Input"
import Select from "../Select"
import Button from "../Button"
import SuccessAlert from "../SuccessAlert"
import { useNavigate } from 'react-router-dom'

const ProductUpdate = (props) => {

    const { handleUpdate, handleGetProductById, handleCheckProductAvailability, handleCheckCategoryAvailability, suppliers, categories, prevProductName, prevProductSupplier, prevProductCategory, guid } = props

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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdateProduct({ ...updateProduct, [name]: value })
    }

    const handleUpdateProduct = async (data) => {
        const validationError = ValidateData(data)

        if (validationError) {
            ErrorAlert({ message: validationError })
            return
        }

        const status = await handleCheckProductAvailability(data.name, data.supplierGuid, data.categoryGuid)
        const statusCategory = await handleCheckCategoryAvailability(data.categoryGuid, data.supplierGuid)

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
                        name="name"
                        type="text"
                        value={updateProduct.name}
                        onChange={handleInputChange}
                    />
                    <Select
                        name="supplierGuid"
                        value={updateProduct.supplierGuid}
                        onChange={handleInputChange}
                        options={suppliers}
                    />
                    <Select
                        name="categoryGuid"
                        value={updateProduct.categoryGuid}
                        onChange={handleInputChange}
                        options={categories.filter((category) => category.supplierGuid === updateProduct.supplierGuid)}
                    />
                    <Input
                        name="stock"
                        type="number"
                        value={updateProduct.stock}
                        onChange={handleInputChange}
                    />
                    <Input
                        name="price"
                        type="number"
                        value={updateProduct.price}
                        onChange={handleInputChange}
                    />
                    <Input
                        name="description"
                        type="text"
                        value={updateProduct.description}
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

export default ProductUpdate