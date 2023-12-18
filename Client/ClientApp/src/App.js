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
import Page404 from './pages/NotFound404'
import ForgotPassword from './pages/ForgotPassword'
import ChangePassword from './pages/ChangePassword'
import RolePage from './pages/RolePage'
import AddRole from './pages/AddRole'
import UserRolePage from './pages/UserRolePage'
import AddUserRole from './pages/AddUserRole'
import ProductUpdatePage from './pages/ProductUpdatePage'

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
                    <Route path="/role" element={<RolePage />} />
                    <Route path="/user-role" element={<UserRolePage />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/add-supplier" element={<AddSupplier />} />
                    <Route path="/add-category" element={<AddCategory />} />
                    <Route path="/add-product" element={<AddProduct />} />
                    <Route path="/add-transaction" element={<AddTransaction />} />
                    <Route path="/add-role" element={<AddRole />} />
                    <Route path="/add-user-role" element={<AddUserRole />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/change-password" element={<ChangePassword />} />
                    <Route path="/update-product" element={<ProductUpdatePage />} />
                    <Route path="/error401" element={<Page401 />} />
                    <Route path="*" element={<Page404 />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App