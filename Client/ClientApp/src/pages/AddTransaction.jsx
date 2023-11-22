import { useNavigate } from 'react-router-dom'
import Button from "../components/Button"
import TransactionRepository from "../repositories/TransactionRepository"
import TransactionForm from '../components/transactions/TransactionForm'
import Navigate from '../components/Navigate'

const AddTransaction = () => {
    const navigate = useNavigate()
    const handleTransactionClick = () => {
        navigate("/transaction")
    }
    const { handleCreate, products, users, handleUpdateStock } = TransactionRepository()
    return (
        <div>
            <Navigate />
            <br></br>
            <TransactionForm
                handleCreate={handleCreate}
                products={products}
                users={users}
                handleUpdateStock={handleUpdateStock}
            />
            <Button
                name="Back"
                className="btn btn-primary"
                onClick={handleTransactionClick}
            />
        </div>
    )
}

export default AddTransaction