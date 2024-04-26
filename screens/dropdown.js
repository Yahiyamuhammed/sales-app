import React, { useState } from 'react';
import { View, Text, TouchableWithoutFeedback, FlatList, Keyboard } from 'react-native';
import { TextInput } from 'react-native-paper';
import { SelectList } from 'react-native-dropdown-select-list'

const MyComponent = () => {
  



  const [selected, setSelected] = React.useState("");
  
  const data = [
      {key:'1', value:'Mobiles', disabled:true},
      {key:'2', value:'Appliances'},
      {key:'3', value:'Cameras'},
      {key:'4', value:'Computers', disabled:true},
      {key:'5', value:'Vegetables'},
      {key:'6', value:'Diary Products'},
      {key:'7', value:'Drinks'},
  ]
  const clearSelection = () => {
    setSelected(""); // Clear the selected value
  };

  return(
    <SelectList 
        setSelected={(val) => setSelected(val)} 
        data={data} 
        save="value"
    />
  )

};

export default MyComponent;
