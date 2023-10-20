export default function TransactionValidation(value) {
    const errors = {}

    const quantityPattern = /^\d+$/;

    if (value.quantity === "") {
        errors.quantity = "Quantity is required.";
    } else if (!quantityPattern.test(value.quantity)) {
        errors.quantity = "Quantity is invalid."
    } else if (value.quantity < 1) {
        errors.quantity = "Quantity must be greater than 1"
    }

    return errors;
}