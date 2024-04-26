import React, { useState } from 'react';
import { View, Text, TouchableWithoutFeedback, FlatList, Keyboard } from 'react-native';
import { TextInput } from 'react-native-paper';
import { SelectList } from 'react-native-dropdown-select-list'
import styles from './styles.js'
import { StyleSheet } from 'react-native';


const MyComponent = ({ onSelectionChange }) => {
  



  const [selected, setSelected] = React.useState("");
  
  const data = [
      {key:'1', value:'Mobiles'},
      {key:'2', value:'Appliances'},
      {key:'3', value:'Cameras'},
      {key:'4', value:'Computers', disabled:true},
      {key:'5', value:'Vegetables'},
      {key:'6', value:'Diary Products'},
      {key:'7', value:'Drinks'},
  ]
  const handleChange = (val) => {
    setSelected(val);
    if (onSelectionChange) { // Call the passed-in function if available
      onSelectionChange(val);
    }
  };
 

  return(
    <View style={styles.input }> {/* Apply white background color to the View */}
    <SelectList 
      setSelected={setSelected}
      data={data} 
      save="value"
    />
  </View>
  )

};

export default MyComponent;
