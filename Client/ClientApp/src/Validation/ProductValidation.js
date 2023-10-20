export default function ProductValidation(value) {
    const errors = {}

    const productPattern = /^[a-zA-Z0-9\s]+$/;
    const stockPattern = /^\d+$/;
    const pricePattern = /^\d+$/;
    const descriptionPattern = /^[a-zA-Z0-9\s]+$/;

    if (value.name === "") {
        errors.name = "Product name is required.";
    } else if (!productPattern.test(value.name)) {
        errors.name = "Product name format is invalid."
    }

    if (value.stock === "") {
        errors.stock = "Stock is required.";
    } else if (!stockPattern.test(value.stock)) {
        errors.stock = "Stock is invalid."
    } else if (value.stock < 1) {
        errors.stock = "Stock must be greater than 1"
    }

    if (value.price === "") {
        errors.price = "Price is required.";
    } else if (!pricePattern.test(value.price)) {
        errors.price = "Price is invalid."
    } else if (value.price < 1) {
        errors.price = "Price must be greater than 1"
    }

    if (value.description === "") {
        errors.description = "Description is required.";
    } else if (!descriptionPattern.test(value.description)) {
        errors.description = "Description format is invalid."
    }

    return errors;
}