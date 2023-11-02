import React, { useState } from 'react'
import Input from '../Input'
import Button from '../Button'
import SuccessAlert from '../SuccessAlert'
import ErrorAlert from '../ErrorAlert'
import { Validation, ValidateData } from '../../Validation/Users/UserValidation'

export default function UserForm({ handleRegister, handleCheckEmail }) {
    const [newUser, setNewUser] = useState({ name: '', email: '', password: '', confirmPassword: '' })

    const [errors, setErrors] = useState({})

    const handleChange = (e) => {
        const { name, value } = e.target
        setNewUser({ ...newUser, [name]: value })
    };

    const handleRegisterUser = async () => {
        const validationError = ValidateData(newUser)

        if (validationError) {
            ErrorAlert({ message: validationError })
            return
        }

        const emailStatus = await handleCheckEmail(newUser.email)

        if (emailStatus === 200) {
            ErrorAlert({ message: 'Email already exists. Please use a different email.' })
        } else if (emailStatus === 404) {
                if (newUser.password === newUser.confirmPassword) {
                    try {
                        await handleRegister(newUser)
                        setNewUser({
                            name: '',
                            email: '',
                            password: '',
                            confirmPassword: '',
                        })
                        SuccessAlert({ message: 'Registration successful.' })
                    } catch (error) {
                        console.error('Error during registration:', error);
                        ErrorAlert({ message: 'Failed to register user. Please try again later.' })
                    }
                } else {
                    ErrorAlert({ message: 'Password and Confirm Password do not match.' })
                }
        } else {
            ErrorAlert({ message: 'Failed to check email availability. Please try again later.' })
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
                <h1>Register</h1>
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
                        name="Register"
                        className="btn btn-primary"
                    />
                </form>
            </div>
        </div>
    )
}