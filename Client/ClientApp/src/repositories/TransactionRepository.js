import { useState, useEffect } from 'react'
import { getAll } from '../apis/UserAPI'
import { getAllProducts, updateStock } from '../apis/ProductApi'
import { getAllTransactions, getTransactionByGuid, create, update, remove } from '../apis/TransactionApi'
import { useNavigate } from 'react-router-dom'
import { GetAuth } from '../components/Auth'

export default function TransactionRepository(){
    const [products, setProducts] = useState([])
    const [users, setUser] = useState([])
    const [transactions, setTransactions] = useState([])
    const [editingTransaction, setEditingTransaction] = useState(null)
    const navigateAuthenticated = useNavigate()

    useEffect(() => {
        const storedToken = GetAuth()
        const isAuthenticated = storedToken !== null
        if (isAuthenticated) {
            fetchData()
            fetchDataProducts()
            fetchDataUser()
        } else if (!isAuthenticated) {
            navigateAuthenticated('/error401')
        }
    }, [])

    const fetchData = async () => {
        try {
            const data = await getAllTransactions()
            if (data) {
                setTransactions(data)
            } else {
                console.log("Data not found")
            }  
        } catch (error) {
            console.error("Error fetching data: ", error)
        }
    }

    const fetchDataProducts = async () => {
        try {
            const data = await getAllProducts()
            setProducts(data)
        } catch (error) {
            console.error("Error fetching data: ", error)
        }
    }

    const fetchDataUser = async () => {
        try {
            const data = await getAll()
            setUser(data)
        } catch (error) {
            console.error("Error fetching data: ", error)
        }
    }

    const handleCreate = async (newTransaction) => {
        try {
            await create(newTransaction)
            fetchData()
        }
        catch (error) {
            console.error("Error create transaction", error)
        }
    }

    const handleEdit = (transactionGuid) => {
        setEditingTransaction(transactionGuid)
    }

    const handleInputChange = (transactionGuid, field, value) => {
        const updatedTransactions = transactions.map((transaction) => (transaction.guid === transactionGuid ? { ...transaction, [field]: value } : transaction))
        setTransactions(updatedTransactions);
    }

    const handleUpdate = async (updatedTransaction) => {
        try {
            const transactionUpdate = await getTransactionByGuid(updatedTransaction.guid)
            const product = products.find(product => product.guid === transactionUpdate.productGuid)
            const newProduct = products.find(product => product.guid === updatedTransaction.productGuid)
            if (transactionUpdate.productGuid !== updatedTransaction.productGuid) {
                const oldQuantity = transactionUpdate.quantity
                const newQuantity = updatedTransaction.quantity    
                product.stock += oldQuantity
                newProduct.stock -= newQuantity
                await updateStock(newProduct)
                await updateStock(product)
            }
            else if (transactionUpdate) {
                const oldQuantity = transactionUpdate.quantity
                const newQuantity = updatedTransaction.quantity
                const stockDifference = newQuantity - oldQuantity
                if (stockDifference > 0) {
                    product.stock -= stockDifference;
                } else if (stockDifference < 0) {
                    product.stock += Math.abs(stockDifference);
                }
                await updateStock(product)
            }
            await update(updatedTransaction)
            setEditingTransaction(null)
            fetchData()
        }
        catch (error) {
            console.error('Error editing transaction:', error)
        }
    }

    const handleDelete = async (transactionGuid) => {
        try {
            const transactionDelete = transactions.find((transaction) => transaction.guid === transactionGuid)
            if (transactionDelete) {
                const productUpdate = products.find((product) => product.guid === transactionDelete.productGuid)
                if (productUpdate) {
                    productUpdate.stock += transactionDelete.quantity
                    await updateStock(productUpdate)
                }
            }
            await remove(transactionGuid)
            if (transactions.length === 1) {
                setTransactions([])
            }
            fetchData()
        }
        catch (error) {
            console.error('Error deleting transaction:', error)
        }
    }

    const handleUpdateStock = async (stock) => {
        try {
            await updateStock(stock)
            fetchDataProducts()
        } catch (error) {
            console.error('Error editing transaction:', error)
        }
    }

    return {
        products, users, transactions, editingTransaction, handleEdit, handleInputChange, handleUpdate, handleDelete, handleUpdateStock, handleCreate
    }
}