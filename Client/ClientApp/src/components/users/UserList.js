import React, { useState } from 'react'
import Button from '../Button'
import DeleteAlert from '../DeleteAlert'
import { useNavigate } from 'react-router-dom'

export default function UserList({ users, handleDelete }) {

    const navigate = useNavigate()

    const handleUpdateClick = (guid) => {
        const userToEdit = users.find((user) => user.guid === guid)
        const prevUserEmail = userToEdit.email
        navigate("/update-user", {
            state: {
                guid,
                prevUserEmail: prevUserEmail
            }
        })
    }

    return (
        <div>
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
                                    {data.name}
                                </td>
                                <td>{
                                    data.email}
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
    )
}