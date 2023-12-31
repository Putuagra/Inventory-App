import React from 'react'
import Button from '../Button'
import DeleteAlert from '../DeleteAlert'
import { useNavigate } from 'react-router-dom'
import { GetAuth, GetTokenClaim } from '../Auth'

const cardStyle = {
    maxWidth: '20rem',
}

export default function TransactionList(props) {

    const { products, users, transactions, handleDelete } = props

    const navigate = useNavigate()
    const token = GetAuth()
    const decode = GetTokenClaim(token)
    const rolesClaim = decode["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]

    const filteredTransactions = transactions.filter(transaction => transaction.userGuid === decode.Guid)

    const handleUpdateClick = (guid) => {
        const transactionToEdit = transactions.find((transaction) => transaction.guid === guid)
        const prevTransactionQuantity = transactionToEdit.quantity
        const prevTransactionProduct = transactionToEdit.productGuid
        navigate("/update-transaction", {
            state: {
                guid,
                prevTransactionQuantity: prevTransactionQuantity,
                prevTransactionProduct: prevTransactionProduct
            }
        })
    }

    return (
        <div className="card-container">
            <br></br>
            {
                Array.isArray(transactions) && transactions.length > 0 ? (
                    rolesClaim.includes("Admin") ? (
                    transactions.map((data, index) =>
                        <div key={index} className="card text-bg-light mb-3" style={cardStyle}>
                            <div className="card-header">{(products.find((product) => product.guid === data.productGuid) || {}).name}</div>
                            <div className="card-body">
                                <h6 className="card-title">
                                    {
                                        (products.find((product) => product.guid === data.productGuid) || {}).name
                                    }
                                </h6>
                                <h6 className="card-text">
                                    {
                                        (users.find((user) => user.guid === data.userGuid) || {}).name
                                    }
                                </h6>
                                <h6 className="card-text">
                                    Quantity:  
                                    {
                                        data.quantity
                                    }
                                </h6>
                                <h6 className="card-text">
                                    Price: 
                                    {
                                        (products.find((product) => product.guid === data.productGuid) || {}).price * data.quantity
                                    }
                                </h6>
                                    <Button
                                        name="Edit"
                                        className="btn btn-primary"
                                        onClick={() => {
                                            handleUpdateClick(data.guid)}}
                                    />
                                    <Button
                                        name="Delete"
                                        className="btn btn-danger"
                                        onClick={() => DeleteAlert({ handleDelete, guid: data.guid })}
                                    />
                            </div>
                        </div>
                        )
                    ) : filteredTransactions.map((data, index) =>
                        <div key={index} className="card text-bg-light mb-3" style={cardStyle}>
                            <div className="card-header">{(products.find((product) => product.guid === data.productGuid) || {}).name}</div>
                            <div className="card-body">
                                <h6 className="card-title">
                                    {
                                        (products.find((product) => product.guid === data.productGuid) || {}).name
                                    }
                                </h6>
                                <h6 className="card-text">
                                    {
                                        (users.find((user) => user.guid === data.userGuid) || {}).name
                                    }
                                </h6>
                                <h6 className="card-text">
                                    Quantity:
                                    {
                                        data.quantity
                                    }
                                </h6>
                                <h6 className="card-text">
                                    Price:
                                    {
                                        (products.find((product) => product.guid === data.productGuid) || {}).price * data.quantity
                                    }
                                </h6>
                            </div>
                        </div>
                    )
                ) : (
                    <h5>No transactions available.</h5>
                )
            }     
        </div>
    )
}