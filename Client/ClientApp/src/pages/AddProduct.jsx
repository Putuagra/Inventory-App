import { useNavigate } from 'react-router-dom'
import ProductRepository from "../repositories/ProductRepository"
import Button from "../components/Button"
import ProductForm from '../components/products/ProductForm'
import { checkProductAvailability } from '../apis/ProductApi'
import Authenticated from '../components/IsAuthenticated'


const AddCategory = () => {
    const navigate = useNavigate()
    const handleProductClick = () => {
        navigate("/product")
    }
    const { handleCreate, suppliers, categories } = ProductRepository()
    Authenticated()
    return (
        <div>
            <ProductForm
                handleCreate={handleCreate}
                suppliers={suppliers}
                categories={categories}
                handleCheckProduct={checkProductAvailability}
            />
            <Button
                name="Back"
                className="btn btn-primary"
                onClick={handleProductClick}
            />
        </div>
    )
}

export default AddCategory