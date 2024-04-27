// MyDatePicker.js
import React, { useState,useEffect } from 'react';
import { View, Button } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const MyDatePicker = ({ onDateSelect }) => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    // Format the date as DD/MM/YYYY
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    console.log("date updated");

    // Invoke the callback with the formatted default date
    onDateSelect(formattedDate);
  }, []); // Run this effect only once when the component is initially rendered


  const handleDateChange = (event, selectedDate) => {
    if (selectedDate) {
      setDate(selectedDate);
      // Format the date as DD/MM/YYYY
      const formattedDate = `${selectedDate.getDate()}/${selectedDate.getMonth() + 1}/${selectedDate.getFullYear()}`;

      // Invoke the callback with the formatted date
      console.log("formatted date =" ,formattedDate);
      onDateSelect(formattedDate);    }
        };

  return (
    <View style={{  justifyContent: 'center', alignItems: 'center' }}> 
      <DateTimePicker
        mode="date"
        value={date}
        onChange={handleDateChange}
      />
      {/* Other components */}
    </View>
  );
};

export default MyDatePicker;
