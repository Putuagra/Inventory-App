import { useLocation } from 'react-router-dom'
import Navigate from "../components/Navigate"
import TransactionUpdate from "../components/transactions/TransactionUpdate"
import TransactionRepository from "../repositories/TransactionRepository"

const TransactionUpdatePage = () => {

    const location = useLocation()
    const guid = location.state?.guid
    const prevTransactionQuantity = location.state?.prevTransactionQuantity
    const prevTransactionProduct = location.state?.prevTransactionProduct
    const { handleUpdate, handleGetTransactionById, users, products } = TransactionRepository()

    return (
        <div className="container">
            <Navigate />
            <br></br>
            <TransactionUpdate
                guid={guid}
                users={users}
                products={products}
                prevTransactionQuantity={prevTransactionQuantity}
                handleUpdate={handleUpdate}
                handleGetTransactionById={handleGetTransactionById}
                prevTransactionProduct={prevTransactionProduct}
            />
        </div>
    )
}

export default TransactionUpdatePage