import React from 'react';
import PropTypes from 'prop-types';

function RadioButton({
  name,
  checked = false,
  onChange,
  className = 'radio-button-question',
  labelName,
}) {
  return (
    <label className={`${className}`}>
      {labelName}
      <input type="radio" name={name} checked={checked} onChange={onChange} />
      <span className="check-mark" />
    </label>
  );
}

RadioButton.propTypes = {
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  labelName: PropTypes.string,
};

export default RadioButton;
