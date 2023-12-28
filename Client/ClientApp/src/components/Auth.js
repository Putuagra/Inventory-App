import { jwtDecode } from "jwt-decode"

export const SetAuth = (token) => {
    localStorage.setItem('token', token)
}

export const RemoveAuth = () => {
    localStorage.removeItem('token')
}

export const GetAuth = () => {
    return localStorage.getItem('token')
}

export const GetTokenClaim = (token) => {
    const decode = jwtDecode(token)
    return decode
}