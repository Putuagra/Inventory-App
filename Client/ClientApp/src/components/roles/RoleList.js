import { useNavigate } from 'react-router-dom'
import Button from "../Button"
import DeleteAlert from "../DeleteAlert"

export default function RoleList(props) {

    const { roles, handleDelete } = props

    const navigate = useNavigate()

    const handleDetailsClick = (guid) => {
        navigate("/user-role", { state: { guid } })
    }

    const handleUpdateClick = (guid) => {
        const roleToEdit = roles.find((role) => role.guid === guid)
        const prevRoleName = roleToEdit.name
        navigate("/update-role", {
            state: {
                guid,
                prevRoleName: prevRoleName
            }
        })
    }

    return (
        <div>
            <br></br>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(roles) && roles.length > 0 ? (
                        roles.map((data, index) => (
                            <tr key={index}>
                                <td>
                                    {data.name}
                                </td>
                                <td>
                                    <Button
                                        name="Edit"
                                        className="btn btn-primary"
                                        onClick={() => {
                                            handleUpdateClick(data.guid)
                                        }}
                                    />
                                    <Button
                                        name="Delete"
                                        className="btn btn-danger"
                                        onClick={() => DeleteAlert({ handleDelete, guid: data.guid })}
                                    />
                                    <Button
                                        name="Details"
                                        className="btn btn-info"
                                        onClick={() => handleDetailsClick(data.guid)}
                                    />
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3">No role available.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}