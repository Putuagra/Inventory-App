import React from 'react'

const Button = ({ name, className, onClick }) => {
    return (
        <div className="col-md-8">
            <button
                className={`form-button ${className}`}
                onClick={onClick}
            >
                {name}
            </button>
        </div>
    )
}

export default Button