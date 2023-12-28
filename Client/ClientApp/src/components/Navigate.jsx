import { NavLink } from 'react-router-dom'
import { GetAuth, GetTokenClaim } from './Auth'

const Navigate = () => {
    const token = GetAuth()
    const decode = GetTokenClaim(token)
    const rolesClaim = decode["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]

    return (
        <nav>
            <ul>
                <li>
                    <NavLink to="/product" className={({ isActive }) =>
                        isActive ? 'active' : ''
                    }>Products</NavLink>
                </li>
                {rolesClaim.includes("Admin") ? (
                    <li>
                        <NavLink to="/category" className={({ isActive }) =>
                            isActive ? 'active' : ''
                        }>Categories</NavLink>
                    </li>
                ) : null}
                {rolesClaim.includes("Admin") ? (
                    <li>
                        <NavLink to="/supplier" className={({ isActive }) =>
                            isActive ? 'active' : ''
                        }>Suppliers</NavLink>
                    </li>
                ) : null}
                {rolesClaim.includes("Admin") ? (
                    <li>
                        <NavLink to="/user" className={({ isActive }) =>
                            isActive ? 'active' : ''
                        }>Users</NavLink>
                    </li>
                ) : null}
                {rolesClaim.includes("Admin") ? (
                <li>
                    <NavLink to="/role" className={({ isActive }) =>
                        isActive ? 'active' : ''
                    }>Roles</NavLink>
                </li>
                ) : null}
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