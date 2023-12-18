import { useLocation } from 'react-router-dom'
import CategoryUpdate from '../components/categories/CategoryUpdate'
import CategoryRepository from '../repositories/CategoryRepository'
import { checkDuplicate } from '../apis/CategoryApi'
import Navigate from '../components/Navigate'

const CategoryUpdatePage = () => {

    const location = useLocation()
    const guid = location.state?.guid
    const prevCategoryName = location.state?.prevCategoryName

    const { handleGetCategoryById, handleUpdate, suppliers } = CategoryRepository()

    return (
        <div className="container">
            <Navigate />
            <br></br>
            <CategoryUpdate
                guid={guid}
                prevCategoryName={prevCategoryName}
                handleUpdate={handleUpdate}
                handleGetCategoryById={handleGetCategoryById}
                handleDuplicate={checkDuplicate}
                suppliers={suppliers}
            />
        </div>
    )
}

export default CategoryUpdatePage