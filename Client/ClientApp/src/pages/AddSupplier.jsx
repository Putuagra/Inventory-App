import Button from "../components/Button"
import { useNavigate } from 'react-router-dom'
import SupplierRepository from "../repositories/SupplierRepository"
import SupplierForm from "../components/suppliers/SupplierForm"
import Navigate from '../components/Navigate'

const AddSupplier = () => {
    const navigate = useNavigate()
    const handleSupplierClick = () => {
        navigate("/supplier")
    }
    const { handleCreate, handleCheckSupplierEmail, handleCheckSupplierName, handleCheckSupplierPhone } = SupplierRepository()
    return (
        <div>
            <Navigate />
            <br></br>
            <SupplierForm
                handleCreate={handleCreate}
                handleCheckSupplierEmail={handleCheckSupplierEmail}
                handleCheckSupplierPhone={handleCheckSupplierPhone}
                handleCheckSupplierName={handleCheckSupplierName}
            />
            <Button
                name="Back"
                className="btn btn-primary"
                onClick={handleSupplierClick}
            />
        </div>
    )
}

export default AddSupplier