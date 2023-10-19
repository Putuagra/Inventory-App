import React from 'react'

const Input = ({
    name,
    type,
    placeholder,
    value,
    onChange,
    errors,
}) => {
    return (
        <div className="col-md-5">
            <label className="form-label">{placeholder}</label>
            <input
                className="form-input"
                type={type}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
            />
            {errors && <label className="error-label">{errors}</label>}
        </div>
    )
}

export default Input