import React, { useState } from 'react';
import axios from "axios";
import Input from '../Input';
import Button from '../Button';
import Validation from '../../Validation/UserValidation';

export default function UserForm({ handleRegister }) {
    const [newUser, setNewUser] = useState({ name: '', email: '', password: '', confirmPassword: '' });

    const [errors, setErrors] = useState({})

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewUser({ ...newUser, [name]: value });
    };

    const handleRegisterUser = async () => {
        const namePattern = /^[a-zA-Z]+$/;
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        const apiUrl = 'https://localhost:7020/api';
        if (!newUser.name || !newUser.email) {
            return;
        }

        if (newUser.password !== newUser.confirmPassword) {
            alert('Password and Confirm Password do not match.');
            return;
        }

        if (!namePattern.test(newUser.name) || !emailPattern.test(newUser.email)) {
            return;
        }

        try {
            const response = await axios.get(`${apiUrl}/User/ByEmail/${newUser.email}`);

            if (response.status === 200) {
                alert('Email already exists. Please use a different email.');
            } else {
                alert('Failed to check email availability. Please try again later.');
            }
        } catch {
            if (newUser.password.length >= 8 && newUser.confirmPassword.length >= 8) {
                if (newUser.password === newUser.confirmPassword) {
                    await handleRegister(newUser);
                    setNewUser({
                        name: '',
                        email: '',
                        password: '',
                        confirmPassword: '',
                    });
                }
            }  
        }
    }

    const handleValidation = (e) => {
        e.preventDefault()
        setErrors(Validation(newUser))
        handleRegisterUser()
    }

    return (
        <div className="row">
            <div className="col-lg-12" noValidate>
                <form
                    onSubmit={handleValidation}
                    className="row g-3 needs-validation"
                >
                    <Input
                        name="name"
                        type="text"
                        placeholder="Name"
                        value={newUser.name}
                        onChange={handleChange}
                        errors={errors.name }
                    />
                    <Input
                        name="email"
                        type="text"
                        placeholder="Email"
                        value={newUser.email}
                        onChange={handleChange}
                        errors={errors.email }
                    />
                    <Input
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={newUser.password}
                        onChange={handleChange}
                        errors={errors.password}
                    />
                    <Input
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm Password"
                        value={newUser.confirmPassword}
                        onChange={handleChange}
                        errors={errors.confirmPassword }
                    />
                    <Button
                        name="Add User"
                    />
                </form>
            </div>
        </div>
    )
}