import React, { useState } from 'react';
import {View,Button} from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';


const MyDatePicker = () => {
  const [date, setDate] = useState(new Date()); // Set the default date to the current date

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <DateTimePicker
  mode="date" // or "time" for time picker
  value={new Date()} // initial date or time value
  onChange={(event, selectedDate) => {
    // Handle the selected date or time
    if (selectedDate) {
      console.log('Selected date:', selectedDate);
      // You can update your state or perform other actions here
    }
  }}
/>

      <Button title="Submit" onPress={() => console.log('Selected Date:', date)} />
    </View>
  );
};

export default MyDatePicker;
