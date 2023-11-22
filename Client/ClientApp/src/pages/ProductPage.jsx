import { checkAvailability } from "../apis/CategoryApi"
import { checkProductAvailability } from "../apis/ProductApi"
import { useNavigate } from 'react-router-dom'
import ProductRepository from "../repositories/ProductRepository"
import Button from "../components/Button"
import Navigate from "../components/Navigate"
import ProductList from "../components/products/ProductList"

const ProductPage = () => {
    const navigate = useNavigate()
    const { products, categories, suppliers, editingProduct, handleEdit, handleInputChange, handleUpdate, handleDelete } = ProductRepository()
    const handleAddProductClick = () => {
        navigate("/add-product")
    }
    return (
        <div className="container">
            <Navigate />
            <ProductList
                products={products}
                categories={categories}
                suppliers={suppliers}
                editingProduct={editingProduct}
                handleEdit={handleEdit}
                handleInputChange={handleInputChange}
                handleUpdate={handleUpdate}
                handleDelete={handleDelete}
                handleCheckProduct={checkProductAvailability}
                handleCategoryAvailability={checkAvailability}
            />
            <Button
                name="Add Product"
                className="btn btn-primary"
                onClick={handleAddProductClick}
            />
        </div>
    )
}

export default ProductPage