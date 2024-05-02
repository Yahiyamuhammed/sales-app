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
  const [location,setLocation]=useState('[]');


  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [Items,setItems]=useState(null);
  const [Item,setItem]=useState([]);
  
  const lastNameInputRef = useRef(); // Create a ref for the last name input

  const handleFirstNameSubmit = () => {
    lastNameInputRef.current.focus(); // Focus the last name input when Enter is pressed in the first name input
  };

  const [selectedLanguage, setSelectedLanguage] = useState();
  const [selectedList, setSelectedList] = useState(null);
  const [wheight, setWheight] = useState('');

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
      // console.log("db loc",location);
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
   const newItem = [Items,wheight,pkts];
   console.log(Items,wheight,pkts);

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
    setLocation({
      latitude: userLocation.latitude,
      longitude: userLocation.longitude
    });
        // console.log("location fn called",location);
  }
 

    return (
      <View style={styles.container}>
      
  <ScrollView>
    
    <View style={styles.inputContainer}> 
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null} keyboardVerticalOffset={100}>
      <View style={{paddingTop:10,marginTop:10}}>
      <View style={styles.shopdheading}>
      <Text style={styles.shopdheadingtext}>Shop Details</Text>
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
      </View></View>



      <View style={{paddingTop:10,marginTop:10}}>
      <View style={styles.shopdheading}>
        
      <Text style={styles.shopdheadingtext}>Sales Details</Text>
      <View style={{ marginTop: 0 }}>


        {selectedList && selectedList.map((item, index) => (
          
          <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', ...styles.selecteditems }}>
  <Text style={{ flexBasis: 100, marginRight: 10, fontSize: 15 }}>{item[0]}</Text>
  <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
    <Text style={{ flexBasis: 60, marginRight: 10, fontSize: 15 }}>{item[1]}(g)</Text>
    <Text style={{ flexBasis: 80, marginRight: 10, fontSize: 15 }}>qty:{item[2]}</Text>
  </View>
</View>

        ))}
        <TextInput
          mode="outlined"
          label="Items Sold"
          // style={styles.inputitem}
          // placeholder="Quantity"
          value={Items}
          onChangeText={setItems}
          // keyboardType="numeric"
        />
      </View>
      <View style={{ flexDirection: 'row', width: '100%' ,alignItems:'center',paddingTop:10 ,paddingRight:10}}>
        <TextInput
          mode="outlined"
          label="Weight (g)"
          style={styles.inputitem}
          // placeholder="Quantity"
          value={wheight}
          onChangeText={setWheight}
          keyboardType="numeric"
        />
       
        <TextInput
          mode="outlined"
          label="Packets"
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
      </View></View>

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