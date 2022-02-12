import React from 'react';
import PropTypes from 'prop-types';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function DatePickerField({
  className = 'date-picker-default',
  valueDate,
  labelName,
  onChange,
  dateFormat = 'yyyy/MM/dd',
}) {
  return (
    <div className={`${className}`}>
      {labelName && <label>{labelName}</label>}
      <ReactDatePicker
        dateFormat={dateFormat}
        selected={valueDate}
        onChange={onChange}
        className="form-control"
      />
    </div>
  );
}

DatePickerField.propTypes = {
  className: PropTypes.string,
  valueDate: PropTypes.string,
  labelName: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  dateFormat: PropTypes.string,
};

export default DatePickerField;
