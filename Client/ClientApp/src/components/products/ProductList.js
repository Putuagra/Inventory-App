import { GetAuth, GetTokenClaim } from '../Auth'
import Button from '../Button'
import DeleteAlert from '../DeleteAlert'
import { useNavigate } from 'react-router-dom'

const cardStyle = {
    maxWidth: '20rem',
}

export const ProductList = (props) => {

    const { products, categories, suppliers, handleDelete} = props
    
    const navigate = useNavigate()
    const token = GetAuth()
    const decode = GetTokenClaim(token)
    const rolesClaim = decode["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]

    const handleUpdateClick = (guid) => {
        const productToEdit = products.find((product) => product.guid === guid)
        const prevProductName = productToEdit.name
        const prevProductSupplier = productToEdit.supplierGuid
        const prevProductCategory = productToEdit.categoryGuid
        navigate("/update-product", {
            state: {
                guid,
                prevProductName: prevProductName,
                prevProductSupplier: prevProductSupplier,
                prevProductCategory: prevProductCategory } })
    }

    return (
        <div className="card-container">
            <br></br>
            {
                Array.isArray(products) && products.length > 0 ? (
                        products.map((data, index) =>
                        <div key={index} className="card text-bg-light mb-3" style={cardStyle}>
                                <div className="card-header">{data.name}</div>
                                <div className="card-body">
                                    <h6 className="card-title">
                                        Name: { }
                                        {
                                            data.name
                                        }
                                    </h6>
                                    <h6 className="card-text">
                                        Supplier: { }
                                        {
                                            (suppliers.find((supplier) => supplier.guid === data.supplierGuid) || {}).name
                                        }
                                    </h6>
                                    <h6 className="card-text">
                                        Category: { }
                                        {
                                            (categories.find((category) => category.guid === data.categoryGuid) || {}).name
                                        }
                                    </h6>
                                    <h6 className="card-text">
                                        Stock: { }
                                        {
                                            data.stock
                                        }
                                    </h6>
                                    <h6 className="card-text">
                                        Price: { }
                                        {
                                            data.price
                                        }
                                    </h6>
                                    <h6 className="card-text">
                                        Description: { }
                                        {
                                            data.description
                                        }
                                    </h6>
                                    {rolesClaim === "Admin" ? (
                                        <Button
                                            name="Edit"
                                            className="btn btn-primary"
                                            onClick={() => {
                                                handleUpdateClick(data.guid)
                                            }}
                                        />
                                    ) : null}
                                    {rolesClaim === "Admin" ? (
                                        <Button
                                            name="Delete"
                                            className="btn btn-danger"
                                            onClick={() => DeleteAlert({ handleDelete, guid: data.guid })}
                                        />
                                    ) : null}
                            </div>
                        </div>
                    )
                ) : (
                    <h5>No product available.</h5>
                )
            }     
        </div>
    )
}