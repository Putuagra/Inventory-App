import React, { useState, useEffect } from 'react'
import { getAll, create, update, remove } from '../apis/UserAPI'

export default function UserList() {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({ name: '', email: '' });
    const [editingUser, setEditingUser] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const data = await getAll();
            setUsers(data);
        } catch (error) {
            console.error("Error fetching data: ", error)
        }
    };

    const handleCreate = async () => {
        try {
            await create(newUser);
            setNewUser({ name: '', email: '', password:'' });
            fetchData();
        } catch (error) {
            console.error("Error create user", error);
        }
    };

    const handleEdit = (userGuid) => {
        setEditingUser(userGuid);
    };

    const handleInputChange = (userGuid, field, value) => {
        const updatedUsers = users.map((user) => (user.guid === userGuid ? { ...user, [field]: value } : user));
        setUsers(updatedUsers);
    };

    const handleUpdate = async (updatedUser) => {
        try {
            const updatedUsers = users.map((user) => user.guid === updatedUser.guid ? updatedUser : user);
            setUsers(updatedUsers);
            await update(updatedUser);
            setEditingUser(null)
        } catch (error) {
            console.error('Error editing user:', error);
        }
    };

    const handleDelete = async (userGuid) => {
        try {
            await remove(userGuid);
            fetchData();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <div className="container">
            <h1>Users</h1>
            <div className="row">
                <div className="col-sm-12">
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
                                                    onChange={(e) => handleInputChange(data.guid, 'email' ,e.target.value)}
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
                </div>
            </div>
            <div className="row">
                <div className="col-sm-12">
                    <div>
                        <input
                            type="text"
                            placeholder="Name"
                            value={newUser.name}
                            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Email"
                            value={newUser.email}
                            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={newUser.password}
                            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                        />
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleCreate}
                        >
                            Add User
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}