import React, { useState,useRef } from 'react';
import { View, Text, TextInput, Button ,Platform ,Pressable,Image ,TouchableOpacity ,Keyboard , KeyboardAvoidingView, ScrollView} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import styles from './styles'; // Import the styles file
// import ListIcon from '../icons/tick icon.svg';
// import SvgComponent from "../SvgComponent";
import {Picker} from '@react-native-picker/picker';
// import SvgComponent from "../icons/tick icon.svg";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
// import { faCircleCheck ,faRegular } from '@fortawesome/free-solid-svg-icons';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';

// import Realm from 'realm';
import * as SQLite from 'expo-sqlite';

import { insertSampleData } from './dbfakedatas.js';



// import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
// import { faCircleCheck } from '@fortawesome/pro-thin-svg-icons';

let ActionSheetIOS;
if (Platform.OS === 'ios') {
  ActionSheetIOS = require('react-native').ActionSheetIOS;
}




// let ActionSheetIOS = Platform.OS === 'ios' ? require('react-native').ActionSheetIOS : undefined;


export default function App() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [framework, setFramework] = useState('');

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items,setItems]=useState([
            
    {label: "I'm interested in...", value: ''},
    {label: 'React', value: 'react'},
    {label: 'Vue', value: 'vue'},
    {label: 'Angular', value: 'angular'},
    {label: 'Svelte', value: 'svelte'},
  ]);
  
  const lastNameInputRef = useRef(); // Create a ref for the last name input

  const handleFirstNameSubmit = () => {
    lastNameInputRef.current.focus(); // Focus the last name input when Enter is pressed in the first name input
  };

  const [selectedLanguage, setSelectedLanguage] = useState();
  const [selectedList, setSelectedList] = useState(null);
  const [quantity, setQuantity] = useState('');

  const [selectedOption, setSelectedOption] = useState('Add Sale Item');



 const handleOpenActionSheet = () => {
    
    console.log('ios');
    const options = ['Cancel', 'Option 1', 'Option 2'];
  const values = ['', 'hi', 'hello']; // Corresponding values
   
  if (Platform.OS === 'ios') {
 ActionSheetIOS.showActionSheetWithOptions(
      
      {
        options:options,
        // options :[
        //     {label: "I'm interested in...", value: ''},
        //     {label: 'React', value: 'react'},
        //     {label: 'Vue', value: 'vue'},
        //     {label: 'Angular', value: 'angular'},
        //     {label: 'Svelte', value: 'svelte'}
        //   ],
        cancelButtonIndex: 0,
        // destructiveButtonIndex: 2,
        userInterfaceStyle: 'dark',
        
        title: 'Add an Item',
      },
      (buttonIndex) => {

        if (buttonIndex > 0) {
          const selectedValue = values[buttonIndex];
          console.log('Selected value:', selectedValue);
          setFramework(selectedValue);
          setSelectedOption(options[buttonIndex]);
          console.log('Selected option:', options[buttonIndex]); // Log the updated value
          // setSelectedList(options[buttonIndex]);

          // Add the selected option to selectedList
          // const newItem = [selectedValue, quantity]; // Assuming quantity is already set elsewhere
          // setSelectedList([...selectedList, newItem]);
          // addSale()
        }
        if (buttonIndex === 1) {
          // Handle Option 1
        } else if (buttonIndex === 2) {
          // Handle Option 2
        }
      }
    );
}
  };

  // let realm;

  // try {
  //   realm = new Realm();
  //   console.log('opened db');
  // } catch (err) {
  //   console.log('Error on opening database ' + err);
  // }
  
  // const PersonSchema = {
  //   name: 'Person',
  //   properties: {
  //     firstName: 'string',
  //     lastName: 'string',
  //     framework: 'string',
  //   },
  // };


  
  let db;
  if (Platform.OS !== 'web') {
    db = SQLite.openDatabase('mydb.db');
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS Items (id INTEGER PRIMARY KEY AUTOINCREMENT, firstName TEXT, lastName TEXT, place TEXT, framework TEXT ,items TEXT);'
      );
    });
    
    // db.transaction(tx => {
    //   tx.executeSql(
    //     'DROP TABLE IF EXISTS Items;'
    //   );
    // });

  }
  
  
  // db.transaction(tx => {
    
  //   tx.executeSql('SELECT * FROM Items;', [], (_, { rows: { _array } }) => {
  //     _array.forEach(item => {
  //       console.log(`ID: ${item.id}, First Name: ${item.firstName}, Last Name: ${item.lastName}, Framework: ${item.framework}`);
  //     });
  //   });
  //   tx.executeSql('DELETE FROM Items;');
  //   tx.executeSql('SELECT * FROM Items;', [], (_, { rows: { _array } }) => {
  //     console.log(_array); // This should log an empty array
  //   });

  // });
  
  const handleSubmit = () => {
    // Handle form submission
    // db.transaction(tx => {
    //   tx.executeSql(
    //     'ALTER TABLE Items ADD COLUMN items TEXT;'
    //   );
    // });
    
    const values = [firstName, lastName, framework ,JSON.stringify(selectedList)];
    // realm.write(() => {
    //   realm.create('Person', values);
    // });
    // console.log(JSON.stringify(values));
    db.transaction(tx => {
      // tx.executeSql('DELETE FROM Items;');
      tx.executeSql(
        'INSERT INTO Items (firstName, lastName, framework, items) values (?, ?, ?, ?);',
        [firstName, lastName, framework, JSON.stringify(selectedList)],
        (_, result) => {
          console.log('Insertion result:', result); // Log the result of the insertion
        },
        (_, error) => {
          console.log('Insertion error:', error); // Log any errors that occur during insertion
        }
      );
      tx.executeSql('DELETE FROM Items;');
x``
    });
    console.log('submitteed values', JSON.stringify(values));
    // alert(JSON.stringify(values, undefined, 2));
    // console.log(JSON.parse(selectedList));
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM Items;', [], (_, { rows: { _array } }) => {
        _array.forEach(item => {
        console.log(`ID: ${item.id}, First Name: ${item.firstName}, Last Name: ${item.lastName}, Framework: ${item.framework} ,Items:${item.items}`);
        });
      });
    });
    
    
  };

  const addSale=()=>
  {
    insertSampleData(db);

    
   // Create a new array to hold the selected items
   const newItem = [framework, quantity];

   // Check if selectedList already has items
   if (selectedList) {
     // If yes, concatenate the new item to the existing array
     setSelectedList([...selectedList, newItem]);
   } else {
     // If no, set the selectedList to contain only the new item
     setSelectedList([newItem]);
   }
 
  }

 

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : null} keyboardVerticalOffset={100}>

<ScrollView>
    <View style={styles.container}>
      {/* <Text style={styles.count}>Render 1 times</Text> */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="First name"
          value={firstName}
          onChangeText={setFirstName}
          onSubmitEditing={handleFirstNameSubmit} // Handle the Enter key press
          blurOnSubmit={false} // Don't close the keyboard on Enter
        />
        <TextInput
         ref={lastNameInputRef} // Assign the ref
          style={styles.input}
          placeholder="Last name"
          value={lastName}
          onChangeText={setLastName}
        />
        <View style={{ marginTop: 20 }}>
              {selectedList && selectedList.map((item, index) => (
                <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ marginRight: 10 }}>Selected List:</Text>
                  <Text>{item[0]} - {item[1]}</Text>
                </View>
              ))}
        </View>
<View style={{ flexDirection: 'row' , width: '100%' }}>
      {Platform.OS !== 'ios' ? (
        <Picker
          style={styles.inputqty}
          selectedValue={framework}
          onValueChange={(itemValue) => {
            setFramework(itemValue);
          }}
        >
          <Picker.Item label="Add Sale Item" value="" />
          <Picker.Item label="React" value="react" />
          <Picker.Item label="Vue" value="vue" />
          <Picker.Item label="Angular" value="angular" />
          <Picker.Item label="Svelte" value="svelte" />
        </Picker>
      ) : (
        <Pressable style={styles.saleButton} onPress={handleOpenActionSheet}>
          <Text style={styles.sale}>{selectedOption}</Text>
        </Pressable>
      )}
      <TextInput
        style={styles.inputitem} 
        placeholder="Quantity"
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="numeric"
      />
      <TouchableOpacity
        onPress={() => {
          console.log('icon pressed');
          Keyboard.dismiss();
          addSale()
        }}
        style={{ ...styles.tickicon, alignItems: 'center', justifyContent: 'center' }}
      >
        <FontAwesomeIcon icon={faCheckCircle} size={30}  />
      </TouchableOpacity>
    </View>
  </View>
      <Button title="Submit" onPress={handleSubmit} style={styles.submitButton}/>
    </View>
     </ScrollView>
     </KeyboardAvoidingView>
  );
}
