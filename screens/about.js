import React, { useState,useRef,useEffect  } from 'react';
import { View, Text, Button ,Platform ,Pressable,Image ,TouchableOpacity ,Keyboard , KeyboardAvoidingView, ScrollView, FlatList} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import styles from './styles'; // Import the styles file
// import ListIcon from '../icons/tick icon.svg';
// import SvgComponent from "../SvgComponent";
import {Picker} from '@react-native-picker/picker';
// import SvgComponent from "../icons/tick icon.svg";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
// import { faCircleCheck ,faRegular } from '@fortawesome/free-solid-svg-icons';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';
// import DatePickerComponent from '../assets/components/datePicker.js';



// import Realm from 'realm';
import * as SQLite from 'expo-sqlite';

import { insertSampleData } from './dbfakedatas.js';
import Creatable from 'react-select/creatable';
import DropdownContainer from './dropdown.js'; // Assuming dropdown.js is in the same directory
import Select from 'react-select'
import { TextInput ,IconButton } from 'react-native-paper';







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


  const [CreatableOption, setCreatableOption] = useState(null);

  const options = [
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
    { value: 'angular', label: 'Angular' },
    { value: 'svelte', label: 'Svelte' },
    { id: 1, label: 'Option 1',value:'sdkfsdn' },
    { id: 2, label: 'Option 2' },
    { id: 3, label: 'Option 3' },
    { id: 4, label: 'Option 4' },
    { id: 5, label: 'Option 5' },
  ];

  const handleChange = (option) => {
    console.log('called hendle change',option,'.label=',option.label);
    setFramework((prevFramework) => {
      console.log('Previous framework value:', prevFramework);
      console.log('New framework value:', option);
      return option;
    });
  };
  useEffect(() => {
    console.log("framework=", framework);
  }, [framework]);
  const itemss = [
    { id: 1, label: 'Item 1' },
    { id: 2, label: 'Item 2' },
    { id: 3, label: 'Item 3' },
  ];
  const handleSelect = (item) => {
    console.log('Selected item:', item);
  };
  
  const handleSubmit = () => {
    // Handle form submission
    // db.transaction(tx => {
    //   tx.executeSql(
    //     'ALTER TABLE Items ADD COLUMN items TEXT;'
    //   );
    // });
    
    const values = [firstName, lastName, framework ,JSON.stringify(selectedList)];
    console.log('submitting values', JSON.stringify(values));
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
      // tx.executeSql('DELETE FROM Items;');
    });



    db.transaction(tx => {
      tx.executeSql(
          'SELECT * FROM Items;',
          [],
          (_, { rows }) => {
              console.log('Whole database:', rows._array); // Log the whole database
          },
          (_, error) => {
              console.log('Error fetching database:', error); // Log any errors that occur during fetching
          }
      );
  });

    console.log('submitteed values', JSON.stringify(values));
    // alert(JSON.stringify(values, undefined, 2));
    // console.log(JSON.parse(selectedList));
   
    
    
  };

  const addSale=()=>
  {
    insertSampleData(db);

    
   // Create a new array to hold the selected items
   const newItem = [framework, quantity];
   console.log(framework,quantity);

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
        <FlatList
          contentContainerStyle={styles.container}
          data={[{ key: 'inputs' }, { key: 'button' }]} // Use keys to distinguish between different sections
          renderItem={({ item }) => (
            item.key === 'inputs' ? (
              <View style={styles.inputContainer}> 
                <TextInput
                mode="outlined"
                label="Shop name"
                  style={styles.input}
                  // placeholder="Shop name"
                  value={firstName}
                  onChangeText={setFirstName}
                  onSubmitEditing={handleFirstNameSubmit} // Handle the Enter key press
                  blurOnSubmit={false} // Don't close the keyboard on Enter
                />
                <TextInput

                  mode="outlined"
                  label="Place"
                  ref={lastNameInputRef} // Assign the ref
                  style={styles.input}
                  // placeholder="Place"
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
                <DropdownContainer handleChange={handleChange} setSelected={setFramework} onSelectionChange={handleChange} />

                </View>
                <View style={{ flexDirection: 'row', width: '100%' }}>
                  <TextInput
                  mode="outlined"
                  label="Quantity"
                    style={styles.inputitem}
                    // placeholder="Quantity"
                    value={quantity}
                    onChangeText={setQuantity}
                    keyboardType="numeric"
                  />
                  <TextInput
                  mode="outlined"
                  label="no.of pkts"
                    style={styles.inputitem}
                    // placeholder="no.of pkts"
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
                    <FontAwesomeIcon icon={faCheckCircle} size={30} />
                  </TouchableOpacity>
                </View>
                {/* <datePicker /> */}
                {/* <DatePickerComponent /> */}

              </View>
            ) : (
              <View>
                <Button title="Submit" onPress={handleSubmit} style={styles.submitButton} />
              </View>
            )
          )}
        />
      </KeyboardAvoidingView>
    );
  }