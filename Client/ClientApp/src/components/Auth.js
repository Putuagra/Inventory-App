export const SetAuth = (token) => {
    localStorage.setItem('token', token)
}

export const RemoveAuth = () => {
    localStorage.removeItem('token')
}

export const GetAuth = () => {
    return localStorage.getItem('token')
}