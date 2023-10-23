import Swal from 'sweetalert2';

const SuccessAlert = ({ message }) => {
    Swal.fire({
        icon: 'success',
        title: message,
        showConfirmButton: false,
        timer: 1500
    });
};

export default SuccessAlert;