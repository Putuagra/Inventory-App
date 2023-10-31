import {BrowserRouter, Routes, Route } from 'react-router-dom'
import CategoryRepository from "./repositories/CategoryRepository";
import ProductRepository from "./repositories/ProductRepository";
import UserRepository from "./repositories/UserRepository"
import TransactionRepository from "./repositories/TransactionRepository";
import SupplierRepository from "./repositories/SupplierRepository"
import "./custom.css"

const App = () => {

    return (
        <div className="container">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<ProductRepository /> } />
                    <Route path="/supplier" element={<SupplierRepository /> } />
                    <Route path="/category" element={<CategoryRepository /> } />
                    <Route path="/user" element={<UserRepository /> } />
                    <Route path="/transaction" element={<TransactionRepository /> } />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App