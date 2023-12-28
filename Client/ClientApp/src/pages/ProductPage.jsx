import { useNavigate } from 'react-router-dom'
import ProductRepository from "../repositories/ProductRepository"
import Button from "../components/Button"
import Navigate from "../components/Navigate"
import { ProductList } from "../components/products/ProductList"
import { GetAuth, GetTokenClaim, RemoveAuth } from '../components/Auth'

const ProductPage = () => {
    const navigate = useNavigate()
    const { products, categories, suppliers, handleDelete } = ProductRepository()
    const token = GetAuth()
    const decode = GetTokenClaim(token)
    const rolesClaim = decode["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]

    const handleAddProductClick = () => {
        navigate("/add-product")
    }

    const handleLogout = () => {
        RemoveAuth()
        navigate('/login')
    }

    return (
        <div className="container">
            <Navigate />
            <br></br>
            <h1>Welcome, {decode.Name}</h1>
            <ProductList
                products={products}
                categories={categories}
                suppliers={suppliers}
                handleDelete={handleDelete}
            />
            {rolesClaim.includes("Admin") ? (
                <Button
                    name="Add Product"
                    className="btn btn-primary"
                    onClick={handleAddProductClick}
                />
            ) : null}
            <Button
                name="Logout"
                className="btn btn-danger"
                onClick={handleLogout}
            />
        </div>
    )
}

export default ProductPage