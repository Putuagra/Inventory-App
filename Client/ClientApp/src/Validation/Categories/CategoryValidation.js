const namePattern = /^[a-zA-Z0-9\s]+$/

export function CategoryValidation(value) {
    const errors = {}

    if (value.name === "") {
        errors.name = "Category name is required."
    } else if (!namePattern.test(value.name)) {
        errors.name = "Category name is invalid."
    }

    return errors
}

export function ValidateData(data) {
    if (data.name === '' && data.supplierGuid === '') {
        return 'All fields must be filled in.'
    }

    if (data.name === '') {
        return 'Category name is required'
    } else if (!namePattern.test(data.name)) {
        return 'Invalid format name.'
    }

    if (data.supplierGuid === '') {
        return 'Supplier is required'
    }
}

export function ValidationDuplicate(data, status, category) {
    if (status === 200 && category !== data.name) {
        return 'Category name already exists in this supplier.'
    }
}