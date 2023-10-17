import React from 'react'

const Button = ({name }) => {
    return (
        <div className="col-md-8">
            <button
                className="form-button btn btn-primary"
            >
                {name}
            </button>
        </div>
    )
}

export default Button