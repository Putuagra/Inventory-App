const namePattern = /^[a-zA-Z0-9]+$/
const addressPattern = /^[a-zA-Z0-9\s]+$/
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
const phoneNumberPattern = /^\+[1-9]\d{1,20}$/

export function SupplierValidation(value) {
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

    if (value.address === "") {
        errors.address = "Address is required."
    } else if (!addressPattern.test(value.address)) {
        errors.address = "Address format is invalid."
    }

    if (value.phoneNumber === "") {
        errors.phoneNumber = "Phone Number is required."
    } else if (!phoneNumberPattern.test(value.phoneNumber)) {
        errors.phoneNumber = "Phone Number is invalid."
    }

    return errors
}

export function ValidateData(data){
    if (data.name === '') {
        return 'Nama harus diisi.'
    } else if (!namePattern.test(data.name)) {
        return 'Invalid format name.'
    }

    if (data.email === '') {
        return 'Email harus diisi.'
    } else if (!emailPattern.test(data.email)) {
        return 'Invalid format email.'
    }

    if (data.address === '') {
        return 'Address harus diisi.'
    } else if (!addressPattern.test(data.address)) {
        return 'Invalid format address.'
    }

    if (data.phoneNumber === '') {
        return 'Phone number harus diisi.'
    } else if (!phoneNumberPattern.test(data.phoneNumber)) {
        return 'Invalid format phone number.'
    }
}

export function ValidationDuplicate(data, name, email, phoneNumber, emailStatus, phoneStatus, nameStatus){

    if (nameStatus === 200 && name !== data.name) {
        return 'Name supplier already exists. Please use a different name.'
    } else if (nameStatus === 500 || nameStatus === 400) {
        return 'Failed to check name supplier availability. Please try again later.'
    }

    if (emailStatus === 200 && email !== data.email) {
        return 'Email already exists. Please use a different email.'
    } else if (emailStatus === 500 || emailStatus === 400) {
        return 'Failed to check email availability. Please try again later.'
    }

    if (phoneStatus === 200 && phoneNumber !== data.phoneNumber) {
        return 'Phone number already exists. Please use a different number.'
    } else if (phoneStatus === 500 || phoneStatus === 400) {
        return 'Failed to check phone number availability. Please try again later.'
    }
}

export function StatusValidate(nameStatus, emailStatus, phoneStatus) {
    if (nameStatus === 200) {
        return 'Name supplier already exists. Please use a different name.'
    }

    if (emailStatus === 200) {
        return 'Email already exists. Please use a different email.'
    }

    if (phoneStatus === 200) {
        return 'Phone number already exists. Please use a different number.'
    }
}