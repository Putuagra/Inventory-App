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
        return 'All fields must be filled in.'
    }

    if (data.quantity === '') {
        return 'Quantity is required.'
    } 

    if (data.productGuid === '') {
        return 'Product is required.'
    }

    if (data.userGuid === '') {
        return 'User is required.'
    }
}