import { useLocation } from 'react-router-dom'
import ProductUpdate from '../components/products/ProductUpdate'
import ProductRepository from '../repositories/ProductRepository'
import Navigate from '../components/Navigate'
import { checkProductAvailability } from '../apis/ProductApi'
import { checkAvailability } from '../apis/CategoryApi'

const ProductUpdatePage = () => {

    const location = useLocation()
    const guid = location.state?.guid
    const prevProductName = location.state?.prevProductName
    const prevProductSupplier = location.state?.prevProductSupplier
    const prevProductCategory = location.state?.prevProductCategory
    const { categories, suppliers, handleUpdate, handleGetProductById } = ProductRepository()
    
    return (
        <div className="container">
            <Navigate />
            <br></br>
            <ProductUpdate
                handleUpdate={handleUpdate}
                handleGetProductById={handleGetProductById}
                handleCheckProduct={checkProductAvailability}
                handleCategoryAvailability={checkAvailability}
                categories={categories}
                suppliers={suppliers}
                prevProductName={prevProductName}
                prevProductSupplier={prevProductSupplier}
                prevProductCategory={prevProductCategory}
                guid={guid}
            />
        </div>
    )
}

export default ProductUpdatePage