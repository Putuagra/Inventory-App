const ValidationDuplicate = async (data, name, email, phoneNumber, emailStatus, phoneStatus, nameStatus) => {

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

export default ValidationDuplicate