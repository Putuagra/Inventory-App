import Swal from 'sweetalert2'

const DeleteAlert = async (props) => {
    const { guid, handleDelete } = props
    const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    })

    if (result.isConfirmed) {
        const response = await handleDelete(guid)
        if (response.status === 200) {
            Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            )
        } /*else if (response.status === 400) {
            Swal.fire({
                icon: 'error',
                title: 'Deletion Failed',
                text: 'This record is associated with other data and cannot be deleted.',
            })
        }*/ else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'This record is associated with other data and cannot be deleted.',
            })
        }
    }
}

export default DeleteAlert