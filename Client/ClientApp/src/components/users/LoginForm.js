import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../Input'
import Button from '../Button'
import ErrorAlert from '../ErrorAlert'
import { SetAuth } from '../Auth'
import { login } from '../../apis/AccountApi'

const LoginForm = () => {
    const navigate = useNavigate()
    const handleRegisterClick = () => {
        navigate("/register")
    }

    const handleLoginClick = () => {
        navigate('/product')
    }

    const handleForgotPasswordClick = () => {
        navigate('/forgot-password')
    }

    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value })
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const response = await login(user)
            if (response.code === 200) {
                console.log('Login berhasil:', response.message)
                const token = response.data
                setUser({
                    email: '',
                    password: '',
                })
                SetAuth(token)
                handleLoginClick()
            } else {
                console.error('Login gagal:', response.message)
            }
        } catch (error) {
            ErrorAlert({ message: 'Email atau password salah' })
        }
    }

    return (
        <div className="container-login">
            <div className="login-form">
                <h1>Login</h1>
                <form
                    onSubmit={handleLogin}
                    className="row g-3 needs-validation"
                >
                    <Input
                        name="email"
                        type="text"
                        placeholder="Email"
                        value={user.email}
                        onChange={handleChange}
                    />
                    <Input
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={user.password}
                        onChange={handleChange}
                    />
                    <Button
                        name="Login"
                        className="btn btn-primary"
                    />
                </form>
                <br></br>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="row">
                            <div className="col-md-6">
                                <Button
                                    name="Buat akun baru"
                                    className="btn btn-success"
                                    onClick={handleRegisterClick}
                                />
                            </div>
                            <div className="col-md-6">
                                <Button
                                    name="Lupa password?"
                                    className="btn btn-link"
                                    onClick={handleForgotPasswordClick}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginForm