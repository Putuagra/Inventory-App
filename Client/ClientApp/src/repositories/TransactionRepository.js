import React, { useState, useEffect } from 'react'
import { getAll } from '../apis/UserAPI'
import { getAllProducts, updateStock } from '../apis/ProductApi'
import { getAllTransactions, create, update, remove } from '../apis/TransactionApi'
import TransactionList from '../components/transactions/TransactionList'
import TransactionForm from '../components/transactions/TransactionForm'

export default function TransactionRepository(){
    const [products, setProducts] = useState([]);
    const [users, setUser] = useState([]);
    const [transacations, setTransactions] = useState([]);
    const [editingTransaction, setEditingTransaction] = useState(null);

    useEffect(() => {
        fetchData()
        fetchDataProducts()
        fetchDataUser()
    }, [])

    const fetchData = async () => {
        try {
            const data = await getAllTransactions()
            setTransactions(data)
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    }

    const fetchDataProducts = async () => {
        try {
            const data = await getAllProducts();
            setProducts(data);
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    }

    const fetchDataUser = async () => {
        try {
            const data = await getAll();
            setUser(data);
        } catch (error) {
            console.error("Error fetching data: ", error);
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
        const updatedTransactions = transacations.map((transaction) => (transaction.guid === transactionGuid ? { ...transaction, [field]: value } : transaction))
        setTransactions(updatedTransactions);
    }

    const handleUpdate = async (updatedTransaction) => {
        try {
            await update(updatedTransaction)
            setEditingTransaction(null)
            fetchData()
        }
        catch (error) {
            console.error('Error editing transaction:', error);
        }
    }

    const handleDelete = async (transactionGuid) => {
        try {
            const transactionDelete = transacations.find((transaction) => transaction.guid === transactionGuid)
            if (transactionDelete) {
                const productUpdate = products.find((product) => product.guid === transactionDelete.productGuid)
                if (productUpdate) {
                    productUpdate.stock += transactionDelete.quantity
                    await updateStock(productUpdate)
                }
            }
            await remove(transactionGuid)
            fetchData()
            fetchDataProducts()
        }
        catch (error) {
            console.error('Error deleting transaction:', error);
        }
    }

    const handleUpdateStock = async (stock) => {
        try {
            await updateStock(stock)
            fetchDataProducts()
        } catch (error) {
            console.error('Error editing transaction:', error);
        }
    }

    return (
        <div className="container">
            <h1>Transactions</h1>
            <TransactionList
                products={products}
                users={users}
                transactions={transacations}
                editingTransaction={editingTransaction}
                handleEdit={handleEdit}
                handleInputChange={handleInputChange}
                handleUpdate={handleUpdate}
                handleDelete={handleDelete}
            />
            <TransactionForm
                handleCreate={handleCreate}
                products={products}
                users={users}
                handleUpdateStock={handleUpdateStock}
            />
        </div>
    )
}