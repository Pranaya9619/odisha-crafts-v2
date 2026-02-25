// src/components/ui/InputField.jsx
import React from "react";

const InputField = ({
  label,
  type = "text",
  name, // 👈 ADD THIS
  value,
  onChange,
  placeholder,
}) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-sm font-medium text-gray-700">
        {label}
      </label>

      <input
        type={type}
        name={name}   // 👈 ADD THIS
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-200"
      />
    </div>
  );
};

export default InputField;