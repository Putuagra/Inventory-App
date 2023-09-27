import React from 'react';

export default function UserList({ users, editingUser, handleEdit, handleInputChange, handleUpdate, handleDelete }) {
    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {Array.isArray(users) && users.length > 0 ? (
                    users.map((data, index) => (
                        <tr key={index}>
                            <td>
                                {editingUser === data.guid ? (
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => handleInputChange(data.guid, 'name', e.target.value)}
                                    />
                                ) : (
                                    data.name
                                )}
                            </td>
                            <td>{
                                editingUser === data.guid ? (
                                    <input
                                        type="text"
                                        value={data.email}
                                        onChange={(e) => handleInputChange(data.guid, 'email', e.target.value)}
                                    />
                                ) : (
                                    data.email
                                )}
                            </td>
                            <td>
                                {editingUser === data.guid ? (
                                    <button
                                        type="button"
                                        className="btn btn-success"
                                        onClick={() => handleUpdate(data)}
                                    >
                                        Save
                                    </button>
                                ) : (
                                    <>
                                        <button
                                            type="button"
                                            className="btn btn-primary"
                                            onClick={() => handleEdit(data.guid)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-danger"
                                            onClick={() => handleDelete(data.guid)}
                                        >
                                            Delete
                                        </button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="3">No user data available.</td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}