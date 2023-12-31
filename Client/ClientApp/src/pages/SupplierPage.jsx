import Button from "../components/Button"
import { useNavigate } from 'react-router-dom'
import SupplierRepository from "../repositories/SupplierRepository"
import Navigate from "../components/Navigate"
import SupplierList from "../components/suppliers/SupplierList"

const SupplierPage = () => {
    const navigate = useNavigate()
    const { suppliers, handleDelete } = SupplierRepository()

    const handleAddSupplierClick = () => {
        navigate("/add-supplier")
    }

    return (
        <div className="container">
            <Navigate />
            <SupplierList
                suppliers={suppliers}
                handleDelete={handleDelete}
            />
            <Button
                name="Add Supplier"
                className="btn btn-primary"
                onClick={handleAddSupplierClick}
            />
        </div>
    )
}

export default SupplierPage