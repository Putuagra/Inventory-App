import { useLocation } from 'react-router-dom'
import Navigate from "../components/Navigate"
import SupplierUpdate from "../components/suppliers/SupplierUpdate"
import SupplierRepository from '../repositories/SupplierRepository'

const SupplierUpdatePage = () => {

    const location = useLocation()
    const guid = location.state?.guid
    const prevSupplierName = location.state?.prevSupplierName
    const prevSupplierEmail = location.state?.prevSupplierEmail
    const prevSupplierPhoneNumber = location.state?.prevSupplierPhoneNumber
    const { handleUpdate, handleGetSupplierById, handleCheckSupplierEmail, handleCheckSupplierName, handleCheckSupplierPhone } = SupplierRepository()

    return (
        <div className="container">
            <Navigate />
            <br></br>
            <SupplierUpdate
                guid={guid}
                prevSupplierName={prevSupplierName}
                prevSupplierEmail={prevSupplierEmail}
                prevSupplierPhoneNumber={prevSupplierPhoneNumber}
                handleCheckSupplierEmail={handleCheckSupplierEmail}
                handleCheckSupplierPhone={handleCheckSupplierPhone}
                handleCheckSupplierName={handleCheckSupplierName}
                handleUpdate={handleUpdate}
                handleGetSupplierById={handleGetSupplierById }
            />
        </div>
    )
}

export default SupplierUpdatePage