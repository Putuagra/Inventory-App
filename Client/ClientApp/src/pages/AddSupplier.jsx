import { checkEmailAvailability, checkName, checkPhoneAvailability } from "../apis/SupplierApi"
import Button from "../components/Button"
import { useNavigate } from 'react-router-dom'
import SupplierRepository from "../repositories/SupplierRepository"
import SupplierForm from "../components/suppliers/SupplierForm"

const AddSupplier = () => {
    const navigate = useNavigate()
    const handleSupplierClick = () => {
        navigate("/supplier")
    }
    const { handleCreate } = SupplierRepository()
    return (
        <div>
            <SupplierForm
                handleCreate={handleCreate}
                handleEmail={checkEmailAvailability}
                handlePhoneNumber={checkPhoneAvailability}
                handleName={checkName}
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