import Swal from 'sweetalert2'

const ErrorAlert = ({ message }) => {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: message,
    })
}

export default ErrorAlert