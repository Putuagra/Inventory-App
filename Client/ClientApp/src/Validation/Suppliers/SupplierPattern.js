const namePattern = /^[a-zA-Z0-9]+$/
const addressPattern = /^[a-zA-Z0-9\s]+$/
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
const phoneNumberPattern = /^\+[1-9]\d{1,20}$/

const ValidateData = (data) => {
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

    return null
}

export default ValidateData