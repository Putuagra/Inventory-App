import React from 'react'

const InputUpdate = ({
    type,
    value,
    onChange,
    errors,
}) => {
    return (
        <div className="col-md-11">
            <input
                className="form-input"
                type={type}
                value={value}
                onChange={onChange}
            />
            {errors && <label className="error-label">{errors}</label>}
        </div>
    )
}

export default InputUpdate