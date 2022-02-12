import React from 'react';
import PropTypes from 'prop-types';

function InputField({
  value,
  label,
  name,
  placeholder,
  type = 'text',
  onChange,
  className = 'input-default',
  htmlFor,
  classLabel,
  register,
  classNameInput,
  errors,
  disabled = false,
}) {
  return (
    <div className={`${className} form-group`}>
      {label && (
        <label htmlFor={htmlFor} className={classLabel}>
          {label}
        </label>
      )}
      <input
        type={type}
        value={value}
        name={name}
        id={htmlFor}
        className={`form-control ${classNameInput}`}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
        {...register}
      />
      <div className="invalid-feedback">{errors}</div>
    </div>
  );
}

// We require the use of src and alt, only enforced by react in dev mode
InputField.propTypes = {
  value: PropTypes.string.isRequired,
  label: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  htmlFor: PropTypes.string,
};

export default InputField;
