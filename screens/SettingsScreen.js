// import React from 'react';
// import Example from './footer'; // Import the Example component from footer.js

// export default function FooterScreen() {
//   return (
//     <Example /> // Render the Example component
//   );
// }
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Locations from '../assets/components/location.js';
import React from 'react';
import MapView from 'react-native-maps';
// import { StyleSheet, View } from 'react-native';


export default function App() {
  return (
    
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      {/* <Locations /> */}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // height:'100%',
    // width:'100%',
    flex: 1,
    backgroundColor: '#bae2da',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
