import React from 'react'

const InputUpdate = (props) => {
    const { type,
        value,
        onChange, } = props
    return (
        <div className="col-md-11">
            <input
                className="form-input"
                type={type}
                value={value}
                onChange={onChange}
            />
        </div>
    )
}

export default InputUpdate