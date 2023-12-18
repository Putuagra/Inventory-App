import Button from '../Button'
import DeleteAlert from '../DeleteAlert'
import { useNavigate } from 'react-router-dom'

export default function SupplierList(props) {

    const { suppliers, handleDelete } = props

    const navigate = useNavigate()

    const handleUpdateClick = (guid) => {
        const supplierToEdit = suppliers.find((supplier) => supplier.guid === guid)
        const prevSupplierName = supplierToEdit.name
        const prevSupplierEmail = supplierToEdit.email
        const prevSupplierPhoneNumber = supplierToEdit.phoneNumber
        navigate("/update-supplier", {
            state: {
                guid,
                prevSupplierName: prevSupplierName,
                prevSupplierEmail: prevSupplierEmail,
                prevSupplierPhoneNumber: prevSupplierPhoneNumber
            }
        })
    }
    
    return (
        <div>
            <br></br>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Phone Number</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(suppliers) && suppliers.length > 0 ? (
                        suppliers.map((data, index) => (
                            <tr key={index}>
                                <td>
                                    {data.name}
                                </td>
                                <td>
                                    {data.email}
                                </td>
                                <td>
                                    {data.address}
                                </td>
                                <td>
                                    {data.phoneNumber}
                                </td>
                                <td>
                                    <Button
                                        name="Edit"
                                        className="btn btn-primary"
                                        onClick={() => {
                                            handleUpdateClick(data.guid)
                                        }}
                                    />
                                    <Button
                                        name="Delete"
                                        className="btn btn-danger"
                                        onClick={() => DeleteAlert({ handleDelete, guid: data.guid })}
                                    />
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3">No supplier available.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}