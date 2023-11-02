import React from 'react'

const Button = (props) => {
    const { name, className, onClick } = props
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