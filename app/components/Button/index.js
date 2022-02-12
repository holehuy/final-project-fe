import React from 'react';
import PropTypes from 'prop-types';

function Button({
  classSpinner,
  className = 'btn btn-primary',
  buttonName = 'button',
  onClick,
  disabled = false,
  type = 'button',
  icon,
  isLoading = false,
  iconSlack,
}) {
  return (
    // eslint-disable-next-line react/button-has-type
    <button
      type={type}
      onClick={onClick}
      className={`${className} btn button-common`}
      disabled={disabled}
    >
      {isLoading && (
        <span
          className={`spinner-border text-light spinner-delete mx-2 ${classSpinner}`}
          role="status"
        />
      )}
      {iconSlack} {icon} {buttonName}
    </button>
  );
}

Button.propTypes = {
  className: PropTypes.string,
  buttonName: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  icon: PropTypes.any,
  isLoading: PropTypes.bool,
  iconSlack: PropTypes.string,
};

export default Button;
