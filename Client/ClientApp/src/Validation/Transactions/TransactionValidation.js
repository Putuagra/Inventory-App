export function TransactionValidation(value) {
    const errors = {}

    const quantityPattern = /^\d+$/

    if (value.quantity === "") {
        errors.quantity = "Quantity is required."
    } else if (!quantityPattern.test(value.quantity)) {
        errors.quantity = "Quantity is invalid."
    } else if (value.quantity < 1) {
        errors.quantity = "Quantity must be greater than 1"
    }

    return errors
}

export function ValidateData(data) {
    if (data.quantity === '' && data.userGuid === '' && data.productGuid === '') {
        return 'Semua field harus diisi.'
    }

    if (data.quantity === '') {
        return 'Quantity harus diisi.'
    } 

    if (data.productGuid === '') {
        return 'Product harus diisi.'
    }

    if (data.userGuid === '') {
        return 'User harus diisi.'
    }
}