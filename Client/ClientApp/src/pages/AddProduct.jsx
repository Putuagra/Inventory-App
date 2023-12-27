import { useNavigate } from 'react-router-dom'
import ProductRepository from "../repositories/ProductRepository"
import Button from "../components/Button"
import ProductForm from '../components/products/ProductForm'
import Navigate from '../components/Navigate'


const AddProduct = () => {
    const navigate = useNavigate()
    const handleProductClick = () => {
        navigate("/product")
    }
    const { handleCreate, handleCheckProductAvailability, suppliers, categories } = ProductRepository()
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