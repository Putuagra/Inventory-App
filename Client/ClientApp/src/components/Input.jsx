import React from 'react'

const Input = ({
    name,
    type,
    placeholder,
    value,
    onChange
}) => {
    return (
        <div className="col-md-6">
            <label className="form-label">{placeholder}</label>
            <input
                className="form-input"
                type={type}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
                required
            />
        </div>
    )
}

export default Input