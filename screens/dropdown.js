import React from 'react';
import { SelectList } from 'react-native-dropdown-select-list';

const DropdownContainer = ({ handleChange }) => {
  const data = [
    { key: '1', value: 'Mobiles', disabled: true },
    { key: '2', value: 'Appliances' },
    { key: '3', value: 'Cameras' },
    { key: '4', value: 'Computers', disabled: true },
    { key: '5', value: 'Vegetables' },
    { key: '6', value: 'Diary Products' },
    { key: '7', value: 'Drinks' },
  ];

  return (
    <SelectList
      setSelected={(val) => handleChange(val)} // Call handleChange prop when selection changes
      data={data}
      save="value"
    />
  );
};

export default DropdownContainer;
