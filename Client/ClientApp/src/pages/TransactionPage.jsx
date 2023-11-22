import { useNavigate } from 'react-router-dom'
import Button from "../components/Button"
import Navigate from "../components/Navigate"
import TransactionList from "../components/transactions/TransactionList"
import TransactionRepository from "../repositories/TransactionRepository"

const TransactionPage = () => {
    const navigate = useNavigate()
    const { products, users, transactions, editingTransaction, handleEdit, handleInputChange, handleUpdate, handleDelete, handleUpdateStock } = TransactionRepository()
    const handleAddTransactionClick = () => {
        navigate("/add-transaction")
    }
    return (
        <div className="container">
            <Navigate />
            <TransactionList
                products={products}
                users={users}
                transactions={transactions}
                editingTransaction={editingTransaction}
                handleEdit={handleEdit}
                handleInputChange={handleInputChange}
                handleUpdate={handleUpdate}
                handleDelete={handleDelete}
                handleUpdateStock={handleUpdateStock}
            />
            <Button
                name="Add Transaction"
                className="btn btn-primary"
                onClick={handleAddTransactionClick}
            />
        </div>
    )
}

export default TransactionPage