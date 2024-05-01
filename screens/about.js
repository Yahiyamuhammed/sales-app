import React, { useState,useRef,useEffect  } from 'react';
import { View, Text ,Platform ,Pressable,Image ,TouchableOpacity ,Keyboard , KeyboardAvoidingView, ScrollView, FlatList} from 'react-native';
import { Button } from "react-native-paper";

import DropDownPicker from 'react-native-dropdown-picker';
import styles from './styles'; // Import the styles file
// import ListIcon from '../icons/tick icon.svg';
// import SvgComponent from "../SvgComponent";
import {Picker} from '@react-native-picker/picker';
// import SvgComponent from "../icons/tick icon.svg";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
// import { faCircleCheck ,faRegular } from '@fortawesome/free-solid-svg-icons';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import DatePickerComponent from '../assets/components/datePicker.js';
import { initDatabase, insertItem ,dropTable} from '../assets/components/database.js'; // Import the database functions
import Location from '../assets/components/location.js';




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

  initDatabase();
  // dropTable();
  const [firstName, setFirstName] = useState('');
  const [Place, setPlace] = useState('');
  const [shopName, setshopName] = useState('');
  const [pkts, setpkts] = useState('');
  const [balance, setBalance] = useState(null);
  const [location,setLocation]=useState('');


  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [Items,setItems]=useState([
            
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

  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1; // Month is zero-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  
  const currentDate = formatDate(new Date());
  
  const [selectedDate, setSelectedDate] = useState(currentDate);


  let db;
  if (Platform.OS !== 'web') {
    db = SQLite.openDatabase('mydb.db');
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS Items (id INTEGER PRIMARY KEY AUTOINCREMENT, ShopName TEXT, Place TEXT, Items TEXT, Quantity TEXT ,pkts TEXT,Date TEXT);'
      );
    });
    
    // db.transaction(tx => {
    //   tx.executeSql(
    //     'DROP TABLE IF EXISTS Items;'
    //   );
    // });

  }
  

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
    setItems((prevItems) => {
      console.log('Previous Items value:', prevItems);
      console.log('New Items value:', option);
      return option;
    });
  };
  useEffect(() => {
    console.log("Items=", Items);
  }, [Items]);

  useEffect(() => {
    console.log("selected variable date :", selectedDate);
  }, [selectedDate]); // Log the selectedDate whenever it changes

  const itemss = [
    { id: 1, label: 'Item 1' },
    { id: 2, label: 'Item 2' },
    { id: 3, label: 'Item 3' },
  ];
  const handleSelect = (item) => {
    console.log('Selected item:', item);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date); // Update the date variable
    console.log("selected variable date :",selectedDate);
  };
  
  const handleSubmit = async () => {
    
    try {
      await insertItem(shopName, Place, quantity, Items, selectedDate, pkts,balance,location);
      // Reset input values after successful insertion
      setshopName('');
      setPlace('');
      setQuantity('');
      setItems([]);
      setSelectedDate(null);
      setpkts('');
      setBalance('');
      setLocation('');
      console.log('Insertion successful');
    } catch (error) {
      console.error('Error inserting item:', error);
    }
  };

    db.transaction(tx => {
      tx.executeSql(
          'SELECT * FROM Items;',
          [],
          (_, { rows }) => {
              // console.log('\n Whole database:', rows._array); // Log the whole database
          },
          (_, error) => {
              console.log('Error fetching database:', error); // Log any errors that occur during fetching
          }
      );
  });

  //   console.log('submitteed values', JSON.stringify(values));
  //   // alert(JSON.stringify(values, undefined, 2));
  //   // console.log(JSON.parse(selectedList));
   
    
    
  // };

  const addSale=()=>
  {
    // insertSampleData(db);
   
    
   // Create a new array to hold the selected items
   const newItem = [Items, quantity];
   console.log(Items,quantity);

   // Check if selectedList already has items
   if (selectedList) {
     // If yes, concatenate the new item to the existing array
     setSelectedList([...selectedList, newItem]);
   } else {
     // If no, set the selectedList to contain only the new item
     setSelectedList([newItem]);
   }
 

  }

  const getLocation=(userLocation)=>
  {
    setLocation(userLocation);
    // console.log("location fn called",location);
  }
 

    return (
      <View style={styles.container}>
      
  <ScrollView>
    
    <View style={styles.inputContainer}> 
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null} keyboardVerticalOffset={100}>

      
      <TextInput
        mode="outlined"
        label="Shop name"
        style={styles.input}
        // placeholder="Shop name"
        value={shopName}
        onChangeText={setshopName}
        onSubmitEditing={handleFirstNameSubmit} // Handle the Enter key press
        blurOnSubmit={false} // Don't close the keyboard on Enter
      />
      <TextInput
        mode="outlined"
        label="Place"
        ref={lastNameInputRef} // Assign the ref
        style={styles.input}
        // placeholder="Place"
        value={Place}
        onChangeText={setPlace}
      />
      <View style={{ marginTop: 20 }}>
        {selectedList && selectedList.map((item, index) => (
          <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ marginRight: 10 }}>Selected List:</Text>
            <Text>{item[0]} - {item[1]}</Text>
          </View>
        ))}
        <DropdownContainer handleChange={handleChange} setSelected={setItems} onSelectionChange={handleChange} />
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
          value={pkts}
          onChangeText={setpkts}
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
      <TextInput
        mode="outlined"
        label="Balance"
        // style={styles.inputitem}
        // placeholder="no.of pkts"
        value={balance}
        onChangeText={setBalance}
        keyboardType="numeric"
      />
            </KeyboardAvoidingView>
            <View style={margin='0'}>

      <DatePickerComponent onDateSelect={handleDateSelect} />
      <Location onlocationChange={getLocation}/>
      </View>

    </View>
    
   
    <View >
    <Button title="Submit" mode="contained"onPress={handleSubmit} >Submit</Button>
   </View>
  </ScrollView>

  </View>
  

    );
  }