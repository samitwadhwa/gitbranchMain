// components/MultiSelect.js
import React from 'react';
import Select from 'react-select';

const MultiSelect = ({ options, value, onChange }) => {
  return (
    <Select
      isMulti
      options={options}
      value={value}
      onChange={onChange}
      placeholder="Select..."
      className="basic-single "
      classNamePrefix="select"
    />
  );
};

export default MultiSelect;