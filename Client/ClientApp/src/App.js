import CategoryRepository from "./repositories/CategoryRepository";
import ProductRepository from "./repositories/ProductRepository";
import UserRepository from "./repositories/UserRepository"
import TransactionRepository from "./repositories/TransactionRepository";
import SupplierRepository from "./repositories/SupplierRepository"

const App = () => {

    return (
        <div className="container">
            {/*<SupplierRepository />
            <CategoryRepository />*/}
            <ProductRepository />
            {/*<UserRepository />*/}
            <TransactionRepository />
        </div>
    )
}

export default App;