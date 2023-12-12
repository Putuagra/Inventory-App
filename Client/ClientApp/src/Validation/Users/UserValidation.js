const namePattern = /^[a-zA-Z]+$/
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()_+~-]).{8,}$/
const otpPattern = /^\d+$/

export function Validation(value) {
    const errors = {}

    if (value.name === "") {
        errors.name = "Name is required."
    } else if (!namePattern.test(value.name)) {
        errors.name = "Name is invalid."
    }

    if (value.email === "") {
        errors.email = "Email is required."
    } else if (!emailPattern.test(value.email)) {
        errors.email = "Email format is invalid."
    }

    if (value.password === "") {
        errors.password = "Password is required."
    } else if (!passwordPattern.test(value.password)) {
        errors.password = "Password must be at least 8 characters long, contain at least one uppercase letter, lowercase letter, one digit number, and one special character."
    }

    if (value.confirmPassword === "") {
        errors.confirmPassword = "Password is required."
    } else if (!passwordPattern.test(value.confirmPassword)) {
        errors.confirmPassword = "Password must be at least 8 characters long, contain at least one uppercase letter, lowercase letter, one digit number, and one special character."
    }

    return errors
}

export function ValidateData(data) {
    if (data.name === '') {
        return 'Nama is required.'
    } else if (!namePattern.test(data.name)) {
        return 'Invalid format name.'
    }

    if (data.email === '') {
        return 'Email is required'
    } else if (!emailPattern.test(data.email)) {
        return 'Invalid format email.'
    }

    if (data.password === '') {
        return 'Password is required'
    } else if (!passwordPattern.test(data.password)) {
        return 'Password must be at least 8 characters long, contain at least one uppercase letter, lowercase letter, one digit number, and one special character.'
    }
}

export function ValidateChangePassword(data) {
    if (data.email === '') {
        return 'Email is required'
    } else if (!emailPattern.test(data.email)) {
        return 'Invalid format email.'
    }

    if (data.otp === '') {
        return 'OTP is required'
    } else if (!otpPattern.test(data.otp)) {
        return 'Invalid format OTP.'
    }

    if (data.newPassword === '') {
        return 'Password is required'
    } else if (!passwordPattern.test(data.newPassword)) {
        return 'Password must be at least 8 characters long, contain at least one uppercase letter, lowercase letter, one digit number, and one special character.'
    }

    if (data.confirmNewPassword === '') {
        return 'Password is required'
    } else if (!passwordPattern.test(data.confirmNewPassword)) {
        return 'Password must be at least 8 characters long, contain at least one uppercase letter, lowercase letter, one digit number, and one special character.'
    }
}

export function ValidationDuplicate(data, emailStatus, email) {
    if (emailStatus === 200 && email !== data.email) {
        return 'Email already exists. Please use a different email.'
    }
}