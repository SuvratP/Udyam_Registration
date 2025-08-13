import React from "react";

const FormField = ({ field, value, onChange, error }) => {
  const { label, name, type, required, pattern, options } = field;

  if (type === "radio" && options) {
    return (
      <div className="mb-4">
        <label className="block font-semibold mb-1">{label}</label>
        {options.map((opt) => (
          <label key={opt.value} className="inline-flex items-center mr-4">
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={value === opt.value}
              onChange={onChange}
              required={required}
              className="form-radio"
            />
            <span className="ml-2">{opt.label}</span>
          </label>
        ))}
        {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
      </div>
    );
  }

  // The rest stays the same (checkbox, select, input)...

  // Default input field render:
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={name} className="block mb-1 font-semibold">
          {label}
        </label>
      )}
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        required={required}
        pattern={pattern || undefined}
        className={`border p-2 rounded w-full ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />
      {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default FormField;
