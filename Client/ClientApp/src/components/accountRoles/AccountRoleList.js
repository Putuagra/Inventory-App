import { checkAccountRole } from "../../apis/AccountRoleApi"
import Button from "../Button"
import DeleteAlert from "../DeleteAlert"

export default function AccountRoleList(props) {

    const { users, handleDelete, roleGuid } = props

    const handleDeleteAccountRole = async (data) => {
        try {
            const response = await checkAccountRole(data.guid, roleGuid)
            const accountRoleGuid = response.data.data.guid
            DeleteAlert({ handleDelete, guid: accountRoleGuid })
        } catch (error) {
            console.error('Error during handleDeleteUserRole:', error)
        }
    }
    
    return (
        <div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(users) && users.length > 0 ? (
                        users.map((data, index) => (
                            <tr key={index}>
                                <td>
                                    {data.name}
                                </td>
                                <td>
                                    {<Button
                                        name="Delete"
                                        className="btn btn-danger"
                                        onClick={() => handleDeleteAccountRole(data)}
                                    />}
                                </td>
                            </tr>
                        ))
                    ) : (
                            <tr>
                                <td colSpan="3">No users with this role available.</td>
                            </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}