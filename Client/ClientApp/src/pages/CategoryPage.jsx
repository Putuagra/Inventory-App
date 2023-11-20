import Button from "../components/Button"
import { checkDuplicate } from "../apis/CategoryApi"
import { useNavigate } from 'react-router-dom'
import CategoryRepository from "../repositories/CategoryRepository"
import CategoryList from "../components/categories/CategoryList"
import Navigate from "../components/Navigate"

const CategoryPage = () => {
    const navigate = useNavigate()
    
    const { categories, suppliers, editingCategory, handleEdit, handleInputChange, handleUpdate, handleDelete } = CategoryRepository()

    const handleAddCategoryClick = () => {
        navigate("/add-category")
    }

    return (
        <div className="container">
            <Navigate />
            <h1>Categories</h1>
            <CategoryList
                categories={categories}
                suppliers={suppliers}
                editingCategory={editingCategory}
                handleEdit={handleEdit}
                handleInputChange={handleInputChange}
                handleUpdate={handleUpdate}
                handleDelete={handleDelete}
                handleDuplicate={checkDuplicate}
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