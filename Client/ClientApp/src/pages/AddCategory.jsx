import { useNavigate } from 'react-router-dom'
import Button from "../components/Button"
import CategoryRepository from "../repositories/CategoryRepository"
import CategoryForm from "../components/categories/CategoryForm"
import Navigate from '../components/Navigate'

const AddCategory = () => {
    const navigate = useNavigate()
    const handleCategoryClick = () => {
        navigate("/category")
    }
    const { handleCreate, suppliers, handleCheckCategoryDuplicate } = CategoryRepository()
    return (
        <div>
            <Navigate />
            <br></br>
            <CategoryForm
                handleCreate={handleCreate}
                suppliers={suppliers}
                handleCheckCategoryDuplicate={handleCheckCategoryDuplicate}
            />
            <Button
                name="Back"
                className="btn btn-primary"
                onClick={handleCategoryClick}
            />
        </div>
    )
}

export default AddCategory