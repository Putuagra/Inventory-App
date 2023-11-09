import { useNavigate } from 'react-router-dom'
import Button from "../components/Button"
import TransactionRepository from "../repositories/TransactionRepository"
import TransactionForm from '../components/transactions/TransactionForm'
import Authenticated from '../components/IsAuthenticated'

const AddTransaction = () => {
    const navigate = useNavigate()
    const handleTransactionClick = () => {
        navigate("/transaction")
    }
    const { handleCreate, products, users, handleUpdateStock } = TransactionRepository()
    Authenticated()
    return (
        <div>
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