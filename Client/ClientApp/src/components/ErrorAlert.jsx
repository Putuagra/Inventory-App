import Swal from 'sweetalert2'

const ErrorAlert = (props) => {
    const { message } = props
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: message,
    })
}

export default ErrorAlert