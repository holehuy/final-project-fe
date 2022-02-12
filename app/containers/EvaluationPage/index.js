import React, { useState } from 'react';
import 'rc-slider/assets/index.css';
import Slider, { SliderTooltip } from 'rc-slider';
const { Handle } = Slider;
function Examination() {
  const [value, setValue] = useState('');
  const handleChange = selectorFiles => {
    setValue(selectorFiles[0].name);
  };

  const marks = {
    50: (
      <div className="marks-0 marks-multi">
        <p>50%</p>
      </div>
    ),
    55: <div className="marks" />,
    60: <div className="marks" />,
    65: <div className="marks" />,
    70: <div className="marks" />,
    75: <div className="marks" />,
    80: <div className="marks" />,
    85: <div className="marks" />,
    90: <div className="marks" />,
    95: <div className="marks" />,
    100: (
      <div className="marks-10 marks-multi">
        <p>100%</p>
      </div>
    ),
  };

  const handle = props => {
    const { value, dragging, index, ...restProps } = props;
    return (
      <SliderTooltip
        prefixCls="rc-slider-tooltip"
        overlay={`${value} %`}
        visible={dragging}
        placement="top"
        key={index}
      >
        <Handle value={value} {...restProps} />
      </SliderTooltip>
    );
  };

  return (
    <div className="page-common">
      <div className="page-sum">
        <div className="page-notes">
          <h3>NOTES:</h3>
          <ul>
            <li>File type must be .pdf or .txt.</li>
            <li>Capacity file must be less than 80Mb.</li>
            <li>
              The system is for academic research purposes only, we are not
              responsible for errors.
            </li>
          </ul>
        </div>
        <div className="form-sum">
          <form className="form">
            <div className="file-upload-wrapper" data-text="Select your file!">
              <input
                value={value}
                id="upload"
                type="file"
                accept="pdf/*"
                onChange={e => handleChange(e.target.files)}
                className="file-upload-field"
              />
            </div>
          </form>
        </div>
        <div className="slider">
          <p className="slider-text">Summary Volume</p>
          <Slider
            min={50}
            max={100}
            defaultValue={60}
            marks={marks}
            handle={handle}
          />
        </div>
        <div className="button-common text-center mt-5">
          <button type="button" className="btn btn-primary mt-5">
            Summarizes
          </button>
        </div>
      </div>
    </div>
  );
}

export default Examination;
