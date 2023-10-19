export default function Validation(value) {
    const errors = {}

    const namePattern = /^[a-zA-Z]+$/;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()_+~-]).{8,}$/;

    if (value.name === "") {
        errors.name = "Name is required.";
    } else if (!namePattern.test(value.name)) {
        errors.name = "Name is invalid."
    }

    if (value.email === "") {
        errors.email = "Email is required.";
    } else if (!emailPattern.test(value.email)) {
        errors.email = "Email format is invalid."
    }

    if (value.password === "") {
        errors.password = "Password is required.";
    } else if (!passwordPattern.test(value.password)) {
        errors.password = "Password must be at least 8 characters long, contain at least one uppercase letter, lowercase letter, one digit number, and one special character."
    }

    if (value.confirmPassword === "") {
        errors.confirmPassword = "Password is required.";
    } else if (!passwordPattern.test(value.confirmPassword)) {
        errors.confirmPassword = "Password must be at least 8 characters long, contain at least one uppercase letter, lowercase letter, one digit number, and one special character."
    }

    return errors;
}