import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Input from '../Input';
import Button from '../Button';

export default function UserForm({ handleRegister }) {
    const [newUser, setNewUser] = useState({ name: '', email: '', password: '', confirmPassword: '' });

    const { register, handleSubmit } = useForm();

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
        <div className="row">
            <div className="col-lg-12" noValidate>
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        handleRegisterUser()
                    }}
                    className="row g-3 needs-validation"
                >
                    <Input
                        name="name"
                        type="text"
                        placeholder="Name"
                        value={newUser.name}
                        onChange={handleChange}
                    />
                    <Input
                        name="email"
                        type="text"
                        placeholder="Email"
                        value={newUser.email}
                        onChange={handleChange}
                    />
                    <Input
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={newUser.password}
                        onChange={handleChange}
                    />
                    <Input
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm Password"
                        value={newUser.confirmPassword}
                        onChange={handleChange}
                    />
                    <Button
                        name="Add User"
                    />
                </form>
            </div>
        </div>
    )
}