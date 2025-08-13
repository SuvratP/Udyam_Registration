import React from 'react';

function DynamicForm({ schema, formData = {}, setFormData, errors, setErrors, onSubmit, loading }) {
  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value,
    }));
    setErrors(prev => ({ ...prev, [id]: '' }));
  };

  const validate = () => {
    let valid = true;
    const newErrors = {};

    for (const field of schema.fields) {
      const value = formData[field.id] ?? ''; // <-- safe access with default empty string

      if (field.required) {
        if (field.type === 'checkbox' && !value) {
          valid = false;
          newErrors[field.id] = 'This field is required.';
        } else if (
          (value === undefined || value === null || value === '') &&
          field.type !== 'checkbox'
        ) {
          valid = false;
          newErrors[field.id] = 'This field is required.';
        }
      }

      if (value && field.validation?.pattern) {
        const regex = new RegExp(field.validation.pattern);
        if (!regex.test(value)) {
          valid = false;
          newErrors[field.id] = field.validation.errorMessage || 'Invalid format.';
        }
      }
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="bg-white p-6 rounded shadow-md w-full max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4">{schema.formTitle}</h2>

      {schema.instructions && (
        <ul className="mb-6 list-disc list-inside text-sm text-gray-600">
          {schema.instructions.map((text, i) => (
            <li key={i}>{text}</li>
          ))}
        </ul>
      )}

      {schema.fields.map(field => {
        const error = errors[field.id];
        const value = formData[field.id] ?? ''; // <-- safe fallback here too
        switch (field.type) {
          case 'text':
          case 'date':
            return (
              <div key={field.id} className="mb-4">
                <label htmlFor={field.id} className="block text-gray-700 mb-1 font-medium">
                  {field.label}{field.required && <span className="text-red-500">*</span>}
                </label>
                <input
                  id={field.id}
                  type={field.type}
                  placeholder={field.placeholder}
                  value={value}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500
                    ${error ? 'border-red-500' : 'border-gray-300'}`}
                  disabled={loading}
                />
                {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
              </div>
            );

          case 'checkbox':
            return (
              <div key={field.id} className="mb-4 flex items-start">
                <input
                  id={field.id}
                  type="checkbox"
                  checked={!!value}
                  onChange={handleChange}
                  className="mt-1 mr-2 h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  disabled={loading}
                />
                <label htmlFor={field.id} className="text-gray-700 font-medium">
                  {field.label}{field.required && <span className="text-red-500">*</span>}
                </label>
                {error && <p className="text-red-600 text-sm mt-1 ml-7">{error}</p>}
              </div>
            );

          case 'select':
            return (
              <div key={field.id} className="mb-4">
                <label htmlFor={field.id} className="block text-gray-700 mb-1 font-medium">
                  {field.label}{field.required && <span className="text-red-500">*</span>}
                </label>
                <select
                  id={field.id}
                  value={value}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500
                    ${error ? 'border-red-500' : 'border-gray-300'}`}
                  disabled={loading}
                >
                  <option value="" disabled>{field.placeholder || 'Select'}</option>
                  {field.options.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
                {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
              </div>
            );

          default:
            return null;
        }
      })}

      <div className="mt-6">
        {schema.buttons.map(btn => (
          <button
            key={btn.id}
            type="submit"
            id={btn.id}
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition-colors"
            disabled={loading}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </form>
  );
}

export default DynamicForm;
