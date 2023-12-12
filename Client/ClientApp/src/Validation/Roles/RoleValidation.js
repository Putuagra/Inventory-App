const namePattern = /^[a-zA-Z0-9\s]+$/

export function RoleValidation(value) {
    const errors = {}

    if (value.name === "") {
        errors.name = "Name is required."
    } else if (!namePattern.test(value.name)) {
        errors.name = "Name is invalid."
    }

    return errors
}

export function ValidateDataRole(data) {
    if (data.name === '') {
        return 'Role name is required.'
    } else if (!namePattern.test(data.name)) {
        return 'Invalid format name.'
    }
}

export function ValidationDuplicate(data, name, status) {

    if (status === 200 && name !== data.name) {
        return 'Role is already exists. Please use a different name.'
    } else if (status === 500 || status === 400) {
        return 'Failed to check role availability. Please try again later.'
    }
}

export function RoleStatusValidate(status) {
    if (status === 200) {
        return 'Role name already exists. Please use a different name.'
    }
}