import { Link } from 'react-router-dom'

const Navigate = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Products</Link>
                </li>
                <li>
                    <Link to="/supplier">Suppliers</Link>
                </li>
                <li>
                    <Link to="/category">Categories</Link>
                </li>
                <li>
                    <Link to="/user">Users</Link>
                </li>
                <li>
                    <Link to="/transaction">Transactions</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navigate