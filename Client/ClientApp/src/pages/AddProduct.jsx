import { useNavigate } from 'react-router-dom'
import ProductRepository from "../repositories/ProductRepository"
import Button from "../components/Button"
import ProductForm from '../components/products/ProductForm'
import Navigate from '../components/Navigate'
import { useEffect } from 'react'
import { GetAuth, GetTokenClaim } from '../components/Auth'

const AddProduct = () => {
    const navigate = useNavigate()
    const token = GetAuth()
    const decode = GetTokenClaim(token)
    const rolesClaim = decode["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]

    const handleProductClick = () => {
        navigate("/product")
    }

    const { handleCreate, handleCheckProductAvailability, suppliers, categories } = ProductRepository()

    useEffect(() => {
        if (!rolesClaim.includes("Admin")) {
            navigate('/error403');
        }
    }, [])

    return (
        <div>
            <Navigate />
            <br></br>
            <ProductForm
                handleCreate={handleCreate}
                suppliers={suppliers}
                categories={categories}
                handleCheckProductAvailability={handleCheckProductAvailability}
            />
            <Button
                name="Back"
                className="btn btn-primary"
                onClick={handleProductClick}
            />
        </div>
    )
}

export default AddProduct