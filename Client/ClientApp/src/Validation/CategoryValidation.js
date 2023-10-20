export default function CategoryValidation(value) {
    const errors = {}

    const namePattern = /^[a-zA-Z0-9\s]+$/;

    if (value.name === "") {
        errors.name = "Category name is required.";
    } else if (!namePattern.test(value.name)) {
        errors.name = "Category name is invalid."
    }

    return errors;
}