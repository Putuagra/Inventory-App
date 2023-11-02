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
        await handleDelete(guid)
        Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
        )
    }
}

export default DeleteAlert