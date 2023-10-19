export default function SupplierValidation(value) {
    const errors = {}

    const namePattern = /^[a-zA-Z0-9]+$/
    const addressPattern = /^[a-zA-Z0-9\s]+$/
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const phoneNumberPattern = /^\+[1-9]\d{1,20}$/

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

    if (value.address === "") {
        errors.address = "Address is required.";
    } else if (!addressPattern.test(value.address)) {
        errors.address = "Address format is invalid."
    }

    if (value.phoneNumber === "") {
        errors.phoneNumber = "Phone Number is required.";
    } else if (!phoneNumberPattern.test(value.phoneNumber)) {
        errors.phoneNumber = "Phone Number is invalid."
    }

    return errors;
}