import React from 'react';
import Select, { components } from 'react-select';
import {
  iconCheckBox,
  iconMultiChoice,
  iconIndicator,
  iconSelectLanguage,
} from 'shared/constants/commonIcon';

const EMOJIS = [iconCheckBox, iconMultiChoice];

const Menu = props => <components.Menu {...props} className="menu-dropdown" />;

const SingleValue = ({ children, ...props }) => (
  <components.SingleValue {...props} className="single-question">
    {children}
  </components.SingleValue>
);

const Placeholder = props => (
  <components.Placeholder {...props} className="select-placeholder" />
);

const SelectContainer = ({ children, ...props }) => (
  <components.SelectContainer {...props} className="select-container">
    {children}
  </components.SelectContainer>
);

const ValueContainer = ({ children, ...props }) => (
  <components.ValueContainer {...props} className="value-container">
    {children}
  </components.ValueContainer>
);

const DropdownBox = ({
  labelName,
  options,
  className,
  defaultValue,
  icon,
  language,
  handleCallBackGetItem,
}) => {
  const Control = ({ children, ...props }) => {
    const { emoji } = props.selectProps;
    const style = { cursor: 'pointer' };
    return (
      <components.Control {...props} className="select-question mt-0">
        {icon && <span style={style}>{emoji}</span>}
        {children}
      </components.Control>
    );
  };

  const DropdownIndicator = props => (
    <components.DropdownIndicator {...props}>
      {language ? iconSelectLanguage : iconIndicator}
    </components.DropdownIndicator>
  );

  const [selected, setSelected] = React.useState(defaultValue || null);

  const handleChange = dataOption => {
    handleCallBackGetItem(dataOption.value);
    setSelected(dataOption);
  };

  const styles = {
    control: css => ({
      ...css,
      cursor: 'pointer',
      marginTop: '5%',
      border: 'none',
      borderRadius: '18px',
      padding: '16px 26px',
      boxShadow: 'none',
      '&:hover': {
        border: 'none',
        boxShadow: 'none',
      },
      '&:active': {
        border: 'none',
        boxShadow: 'none',
      },
    }),
    indicatorsContainer: () => ({}),
    option: () => ({
      width: '100%',
      borderRadius: '8px',
      padding: '.65rem 1rem',
      fontSize: '18px',
      '&:hover': {
        cursor: 'pointer',
        backgroundColor: 'rgba(245, 248, 250, 0.8)',
        color: '#009ef7',
      },
    }),
  };

  const emoji = selected?.value === 'multi' ? EMOJIS[0] : EMOJIS[1];

  return (
    <div className={className}>
      <Select
        emoji={emoji}
        components={{
          Control,
          DropdownIndicator,
          Menu,
          SingleValue,
          Placeholder,
          SelectContainer,
          ValueContainer,
        }}
        isSearchable={false}
        options={options}
        styles={styles}
        onChange={handleChange}
        value={selected}
        placeholder={labelName}
      />
    </div>
  );
};

export default DropdownBox;
