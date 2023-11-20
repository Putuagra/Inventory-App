import {BrowserRouter, Routes, Route } from 'react-router-dom'
import "./custom.css"
import Register from './pages/Register'
import CategoryPage from './pages/CategoryPage'
import ProductPage from './pages/ProductPage'
import UserPage from './pages/UserPage'
import SupplierPage from './pages/SupplierPage'
import TransactionPage from './pages/TransactionPage'
import AddCategory from './pages/AddCategory'
import AddProduct from './pages/AddProduct'
import AddSupplier from './pages/AddSupplier'
import AddTransaction from './pages/AddTransaction'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import Page401 from './pages/Unauthorized401'


const App = () => {

    return (
        <div className="container">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/product" element={<ProductPage />} />
                    <Route path="/supplier" element={<SupplierPage />} />
                    <Route path="/category" element={<CategoryPage />} />
                    <Route path="/user" element={<UserPage />} />
                    <Route path="/transaction" element={<TransactionPage />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/add-supplier" element={<AddSupplier />} />
                    <Route path="/add-category" element={<AddCategory />} />
                    <Route path="/add-product" element={<AddProduct />} />
                    <Route path="/add-transaction" element={<AddTransaction />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/error401" element={<Page401 />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App