import Button from "../Button"
import DeleteAlert from "../DeleteAlert"
import { checkUserRole } from "../../apis/UserRoleApi"

export default function UserRoleList(props) {

    const { users, handleDelete, roleGuid } = props

    const handleDeleteUserRole = async (data) => {
        try {
            const response = await checkUserRole(data.guid, roleGuid)
            const userRoleGuid = response.data.data.guid
            DeleteAlert({ handleDelete, guid: userRoleGuid })
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
                                        onClick={() => handleDeleteUserRole(data)}
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