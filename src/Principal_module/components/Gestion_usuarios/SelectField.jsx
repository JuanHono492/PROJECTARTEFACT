import React from 'react';

const SelectField = ({ label, name, value, onChange, options }) => {
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <select id={name} name={name} value={value} onChange={onChange} required>
                <option value="">Seleccione una opción</option>
                {options.map((option, index) => (
                    <option key={index} value={option.value}>{option.label}</option>
                ))}
            </select>
        </div>
    );
};

export default SelectField;
