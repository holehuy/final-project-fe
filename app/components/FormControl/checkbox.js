import React from 'react';
import PropTypes from 'prop-types';

function Checkbox({
  name,
  checked = false,
  onChange,
  className = 'checkbox-question',
  labelName,
}) {
  return (
    <label className={`${className}`}>
      {labelName}
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
      />
      <span className="check-mark" />
    </label>
  );
}

Checkbox.propTypes = {
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  labelName: PropTypes.string,
};

export default Checkbox;
