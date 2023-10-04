import CategoryRepository from "./repositories/CategoryRepository";
import ProductRepository from "./repositories/ProductRepository";
import UserRepository from "./repositories/UserRepository"
import TransactionRepository from "./repositories/TransactionRepository";

const App = () => {

    return (
        <div className="container">
            {/*<SupplierRepositories />*/}
            {/*<CategoryRepository />*/}
            <ProductRepository />
            {/*<UserRepository />*/}
            <TransactionRepository />
        </div>
    )
}

export default App;