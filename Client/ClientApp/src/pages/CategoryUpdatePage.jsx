import { useLocation } from 'react-router-dom'
import CategoryUpdate from '../components/categories/CategoryUpdate'
import CategoryRepository from '../repositories/CategoryRepository'
import Navigate from '../components/Navigate'

const CategoryUpdatePage = () => {

    const location = useLocation()
    const guid = location.state?.guid
    const prevCategoryName = location.state?.prevCategoryName
    const prevCategorySupplier = location.state?.prevCategorySupplier

    const { handleGetCategoryById, handleUpdate, handleCheckCategoryDuplicate, suppliers } = CategoryRepository()

    return (
        <div className="container">
            <Navigate />
            <br></br>
            <CategoryUpdate
                guid={guid}
                prevCategoryName={prevCategoryName}
                prevCategorySupplier={prevCategorySupplier }
                handleUpdate={handleUpdate}
                handleGetCategoryById={handleGetCategoryById}
                handleCheckCategoryDuplicate={handleCheckCategoryDuplicate}
                suppliers={suppliers}
            />
        </div>
    )
}

export default CategoryUpdatePage