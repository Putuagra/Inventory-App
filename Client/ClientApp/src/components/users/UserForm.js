import React, { useState } from 'react';

export default function UserForm({ handleRegister }) {
    const [newUser, setNewUser] = useState({ name: '', email: '', password: '', confirmPassword: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewUser({ ...newUser, [name]: value });
    };

    const handleRegisterUser = () => {
        if (newUser.password === newUser.confirmPassword) {
            handleRegister(newUser);
            setNewUser({
                name: '',
                email: '',
                password: '',
                confirmPassword: '',
            });
        } else {
            console.error('Password and Confirm Password do not match.');
        }
    }

    return (
        <div>
            <input
                type="text"
                placeholder="Name"
                name="name"
                value={newUser.name}
                onChange={handleChange}
            />
            <input
                type="text"
                placeholder="Email"
                name="email"
                value={newUser.email}
                onChange={handleChange}
            />
            <input
                type="password"
                placeholder="Password"
                name="password"
                value={newUser.password}
                onChange={handleChange}
            />
            <input
                type="password"
                placeholder="ConfirmPassword"
                name="confirmPassword"
                value={newUser.confirmPassword}
                onChange={handleChange}
            />
            <button
                type="button"
                className="btn btn-primary"
                onClick={handleRegisterUser}
            >
                Add User
            </button>
        </div>
    )
}