import { checkEmailAvailability, checkName, checkPhoneAvailability } from "../apis/SupplierApi"
import Button from "../components/Button"
import { useNavigate } from 'react-router-dom'
import SupplierRepository from "../repositories/SupplierRepository"
import Navigate from "../components/Navigate"
import SupplierList from "../components/suppliers/SupplierList"
import Authenticated from "../components/IsAuthenticated"

const SupplierPage = () => {
    const navigate = useNavigate()
    const { suppliers, editingSupplier, handleEdit, handleInputChange, handleUpdate, handleDelete } = SupplierRepository()
    const handleAddSupplierClick = () => {
        navigate("/add-supplier")
    }
    Authenticated()
    return (
        <div className="container">
            <Navigate />
            <h1>Suppliers</h1>
            <SupplierList
                suppliers={suppliers}
                editingSupplier={editingSupplier}
                handleEdit={handleEdit}
                handleInputChange={handleInputChange}
                handleUpdate={handleUpdate}
                handleDelete={handleDelete}
                handleEmail={checkEmailAvailability}
                handlePhoneNumber={checkPhoneAvailability}
                handleName={checkName}
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