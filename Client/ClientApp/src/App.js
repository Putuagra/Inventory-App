import CategoryRepository from "./repositories/CategoryRepository";
import ProductRepository from "./repositories/ProductRepository";
import UserRepository from "./repositories/UserRepository"

const App = () => {

    return (
        <div className="container">
            {/*<SupplierRepositories />*/}
            {/*<CategoryRepository />*/}
            {/*<ProductRepository />*/}
            <UserRepository />
        </div>
    )
}

export default App;