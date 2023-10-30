const productPattern = /^[a-zA-Z0-9\s]+$/
const stockPattern = /^\d+$/
const pricePattern = /^\d+$/
const descriptionPattern = /^[a-zA-Z0-9\s]+$/
export function ProductValidation(value) {
    const errors = {}

    if (value.name === "") {
        errors.name = "Product name is required."
    } else if (!productPattern.test(value.name)) {
        errors.name = "Product name format is invalid."
    }

    if (value.stock === "") {
        errors.stock = "Stock is required."
    } else if (!stockPattern.test(value.stock)) {
        errors.stock = "Stock is invalid."
    } else if (value.stock < 1) {
        errors.stock = "Stock must be greater than 1"
    }

    if (value.price === "") {
        errors.price = "Price is required."
    } else if (!pricePattern.test(value.price)) {
        errors.price = "Price is invalid."
    } else if (value.price < 1) {
        errors.price = "Price must be greater than 1"
    }

    if (value.description === "") {
        errors.description = "Description is required."
    } else if (!descriptionPattern.test(value.description)) {
        errors.description = "Description format is invalid."
    }

    return errors
}

export function ValidateData(data) {
    if (data.name === '' && data.stock === '' && data.price === '' && data.description === '' && data.supplierGuid === '' && data.categoryGuid === '') {
        return 'Semua field harus diisi.'
    }

    if (data.name === "") {
        return "Product name is required."
    } else if (!productPattern.test(data.name)) {
        return "Product name format is invalid."
    }

    if (data.stock === "") {
        return "Stock is required."
    } else if (!stockPattern.test(data.stock)) {
        return "Stock is invalid."
    } else if (data.stock < 1) {
        return "Stock must be greater than 1"
    }

    if (data.price === "") {
        return "Price is required."
    } else if (!pricePattern.test(data.price)) {
        return "Price is invalid."
    } else if (data.price < 1) {
        return "Price must be greater than 1"
    }

    if (data.description === "") {
        return "Description is required."
    } else if (!descriptionPattern.test(data.description)) {
        return "Description format is invalid."
    }
}

export function StatusValidate(status) {
    if (status === 200) {
        return 'Product Name already exists in this category and supplier.'
    }
}

export function ValidationDuplicate(data, name, supplier, status, statusCategory) {

    if (status === 200 && name !== data.name) {
        return 'Product Name already exists in this category and supplier.'
    }

    if (supplier !== data.supplierGuid) {
        if (statusCategory === 404) {
            return 'Category and supplier do not match.'
        }
    }
}