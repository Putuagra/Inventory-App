import { useNavigate } from 'react-router-dom'
import { ValidateUpdateUser, ValidationDuplicate } from '../../Validation/Users/UserValidation'
import { useEffect, useState } from 'react'
import ErrorAlert from '../ErrorAlert'
import SuccessAlert from '../SuccessAlert'
import Input from '../Input'
import Button from '../Button'

const UserUpdate = (props) => {

    const { handleUpdate, handleGetUserById, handleCheckEmail, prevUserEmail, guid } = props
    const navigate = useNavigate()

    const [updateUser, setUpdateUser] = useState({ name: '', email: ''})

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setUpdateUser({ ...updateUser, [name]: value })
    }

    const getUpdateUser = async (guid) => {
        try {
            const response = await handleGetUserById(guid)
            if (prevUserEmail) {
                setUpdateUser(response?.data?.data)
            }
        } catch (error) {
            ErrorAlert({ message: 'An unexpected error occurred.' })
        }
    }

    useEffect(() => {
        getUpdateUser(guid)
    }, [])

    const handleUpdateUser = async (data) => {
        const validationError = ValidateUpdateUser(data)

        if (validationError) {
            ErrorAlert({ message: validationError })
            return
        }

        const emailStatus = await handleCheckEmail(data.email)
        const validateDuplicate = ValidationDuplicate(data, emailStatus, prevUserEmail)

        if (validateDuplicate) {
            ErrorAlert({ message: validateDuplicate })
            return
        } else {
            if (emailStatus === 404 || prevUserEmail === data.email) {
                try {
                    await handleUpdate(data)
                    SuccessAlert({ message: 'Update data successful.' })
                    navigate('/user')
                } catch (error) {
                    console.error('Error during update data:', error)
                    ErrorAlert({ message: 'Failed to update user. Please try again later.' })
                }
            }
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        handleUpdateUser(updateUser)
    }

    return (
        <div className="row">
            <div className="col-lg-12" noValidate>
                <form
                    onSubmit={handleSubmit}
                    className="row g-3 needs-validation"
                >
                    <Input
                        name="name"
                        type="text"
                        value={updateUser.name}
                        onChange={handleInputChange}
                    />
                    <Input
                        name="email"
                        type="text"
                        value={updateUser.email}
                        onChange={handleInputChange}
                    />
                    <Button
                        name="Save"
                        className="btn btn-success"
                    />
                </form>
            </div>
        </div>
    )
}

export default UserUpdate