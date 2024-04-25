// import * as React from 'react';
import React, { useState } from 'react';
import { View, FlatList, Text, TouchableOpacity ,TouchableWithoutFeedback,Keyboard} from 'react-native';
import style from './styles'

import { TextInput ,IconButton } from 'react-native-paper';

   
    const MyComponent = ({ handleChange }) => {
        
    const [text, setText] = React.useState("");
    const [isFocused, setIsFocused] = useState(false);
    const [isClearable, setIsClearable] = useState(false);


  

  // Sample list data for demonstration
  const dataList = [
    { id: 1, label: 'Option 1' },
    { id: 2, label: 'Option 2' },
    { id: 3, label: 'Option 3' },
    { id: 4, label: 'Option 4' },
    { id: 5, label: 'Option 5' },
  ];

  const handleFocus = () => {
    setIsFocused(true);
  };
//   React.useEffect(() => {
//     console.log(selectedItem);
//   }, [selectedItem]);
  


  const handleBlur = () => {
    setTimeout(() => {
        setIsFocused(false); // Set isFocused to false after a delay
      }, 2000);  };

  const handleSelectItem = (item) => {
    console.log(item.label);
    // setSelectedItem(item); // Add this line
        // Call the passed-in handleChange function with the selected item
    handleChange(item);
    setText(item.label);
    setIsClearable(true);
    setIsFocused(false);
    // setTimeout(() => {
    //     setIsFocused(false); // Set isFocused to false after a delay
    //   }, 200);  
    };

    const handleClear = () => {
        setText("");
        setIsClearable(false)
    };


  const renderDropdownList = () => (
    <FlatList 


      data={dataList}
      style={style.select}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => handleSelectItem(item)} 
        >
          <Text style={style.selectItems}>{item.label}</Text>
        </TouchableOpacity>
      )}
      keyExtractor={(item) => item.id.toString()}
    />
  );


  return (
    <TouchableWithoutFeedback onPress={handleFocus}
    onBlur={handleBlur}
    style={style.test}>
    <View >
        <View style={style.testborder}>
      <TextInput
    //   style={style.selectInput}

      style={[style.selectInput, !isClearable && style.fullWidthInput]}

        mode="outlined"
        label="Email"
        value={text}
        isClearable={isClearable}
        onChangeText={(text) => setText(text)}
        onFocus={handleFocus}
       />
      
      {isClearable && ( // Show clear button only if isClearable is true
            // console.log('isClearable:', isClearable), // Add this line

                <IconButton // Use IconButton from react-native-paper
                    icon="close"
                    onPress={handleClear}
                    style={style.clrbutton}
                />
            )}
            </View>

            {isFocused && renderDropdownList()}
      
    </View>
  </TouchableWithoutFeedback>
    
  );
};

export default MyComponent;