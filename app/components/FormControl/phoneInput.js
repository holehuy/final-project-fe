import React from 'react';
import PropTypes from 'prop-types';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

function PhoneInputField({
  value,
  label,
  placeholder,
  onChange,
  className = 'phone-field-default',
  htmlFor,
}) {
  return (
    <div className={`${className} phone-field`}>
      {label && <label htmlFor={htmlFor}>{label}</label>}
      <PhoneInput
        country="vn"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
}

PhoneInputField.propTypes = {
  value: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  htmlFor: PropTypes.string,
};

export default PhoneInputField;
