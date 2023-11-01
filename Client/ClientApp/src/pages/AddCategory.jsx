import { checkDuplicate } from "../apis/CategoryApi"
import { useNavigate } from 'react-router-dom'
import Button from "../components/Button"
import CategoryRepository from "../repositories/CategoryRepository"
import CategoryForm from "../components/categories/CategoryForm"

const AddCategory = () => {
    const navigate = useNavigate()
    const handleCategoryClick = () => {
        navigate("/category")
    }
    const { handleCreate, suppliers } = CategoryRepository()
    return (
        <div>
            <CategoryForm
                handleCreate={handleCreate}
                suppliers={suppliers}
                handleDuplicate={checkDuplicate}
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