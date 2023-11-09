import { NavLink } from 'react-router-dom'

const Navigate = () => {
    return (
        <nav>
            <ul>
                <li>
                    <NavLink to="/product" className={({ isActive }) =>
                        isActive ? 'active' : ''
                    }>Products</NavLink>
                </li>
                <li>
                    <NavLink to="/supplier" className={({ isActive }) =>
                        isActive ? 'active' : ''
                    }>Suppliers</NavLink>
                </li>
                <li>
                    <NavLink to="/category" className={({ isActive }) =>
                        isActive ? 'active' : ''
                    }>Categories</NavLink>
                </li>
                <li>
                    <NavLink to="/user" className={({ isActive }) =>
                        isActive ? 'active' : ''
                    }>Users</NavLink>
                </li>
                <li>
                    <NavLink to="/transaction" className={({ isActive }) =>
                        isActive ? 'active' : ''
                    }>Transactions</NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default Navigate