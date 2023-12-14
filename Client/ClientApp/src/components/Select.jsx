import React from 'react'

const Select = (props) => {
    const { name, label, value, onChange, options } = props
    return (
        <div className="col-md-6">
            <label className="form-label">{label}</label>
            <select
                className="form-input"
                name={name}
                value={value}
                onChange={onChange}
                required
            >
                <option value="">Select {label}</option>
                {options.map((option) => (
                    <option key={option.guid} value={option.guid}>
                        {option.name}
                    </option>
                ))}
            </select>
        </div>
        
    )
}

export default Select