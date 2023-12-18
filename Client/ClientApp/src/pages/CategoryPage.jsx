import Button from "../components/Button"
import { useNavigate } from 'react-router-dom'
import CategoryRepository from "../repositories/CategoryRepository"
import CategoryList from "../components/categories/CategoryList"
import Navigate from "../components/Navigate"

const CategoryPage = () => {
    const navigate = useNavigate()
    
    const { categories, suppliers, handleDelete } = CategoryRepository()

    const handleAddCategoryClick = () => {
        navigate("/add-category")
    }

    return (
        <div className="container">
            <Navigate />
            <CategoryList
                categories={categories}
                suppliers={suppliers}
                handleDelete={handleDelete}
            />
            <Button
                name="Add Supplier"
                className="btn btn-primary"
                onClick={handleAddCategoryClick}
            />
        </div>
    )
}

export default CategoryPage