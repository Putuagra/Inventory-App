import { useEffect } from "react"
import { useNavigate } from 'react-router-dom'

const Authenticated = () => {
    const navigateAuthenticated = useNavigate()
    useEffect(() => {
        const isAuthenticated = localStorage.getItem('authToken') !== null
        if (!isAuthenticated) {
            navigateAuthenticated('/error401')
        }
    }, [])
}

export default Authenticated