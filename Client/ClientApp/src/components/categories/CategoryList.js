import Button from '../Button'
import DeleteAlert from '../DeleteAlert'
import { useNavigate } from 'react-router-dom'

export default function CategoryList(props) {

    const { categories, suppliers, handleDelete } = props

    const navigate = useNavigate()

    const handleUpdateClick = (guid) => {
        const categoryToEdit = categories.find((category) => category.guid === guid)
        const prevCategoryName = categoryToEdit.name
        const prevCategorySupplier = categoryToEdit.supplierGuid
        navigate("/update-category", {
            state: {
                guid,
                prevCategoryName: prevCategoryName,
                prevCategorySupplier: prevCategorySupplier
            }
        })
    }

    return (
        <div>
            <br></br>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Category Name</th>
                        <th>Supplier</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(categories) && categories.length > 0 ? (
                        categories.map((data, index) => (
                            <tr key={index}>
                                <td>
                                    {data.name}
                                </td>
                                <td>
                                    {(suppliers.find((supplier) => supplier.guid === data.supplierGuid) || {}).name}
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
                            <td colSpan="3">No category available.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>  
    )
}