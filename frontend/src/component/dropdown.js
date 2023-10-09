import React from 'react';

function Dropdown({ label, options, value, onChange }) {
    return (
        <div className="flex w-full flex-col">
            <label className="mb-4">{label}</label>
            <select
                className="w-full h-10 px-2 border rounded"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            >
                <option value="">Select an option</option>
                {options.map((option) => (
                    <option key={option.role_name} value={option.role_name}>
                        {option.role_name}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default Dropdown;
