import React ,{useState} from 'react';
import MapView,{PROVIDER_GOOGLE} from 'react-native-maps';
import { StyleSheet, View ,Linking,Platform,Alert} from 'react-native';
import { Button } from "react-native-paper";

import { layer } from '@fortawesome/fontawesome-svg-core';

export  const handleNavigate = (userLocation) => {
  if (userLocation) {
    console.log("user location",userLocation);

    let latitude, longitude;
    
    // const { latitude, longitude } = userLocation;
   // Parse the string into a JavaScript object
const match = userLocation.match(/latitude = "(.*?)";\n.*?longitude = "(.*?)";/);

if (match) {
    const latitudeString = match[1];
    const longitudeString = match[2];

    // Parse latitude and longitude strings to numbers
     latitude = parseFloat(latitudeString);
     longitude = parseFloat(longitudeString);

    console.log("Latitude: ", latitude);
    console.log("Longitude: ", longitude);
} else {
    console.error("Unable to parse user location.");
}
    const url = Platform.select({
      ios: `maps://app?saddr=&daddr=${latitude},${longitude}`,
      android: `google.navigation:q=${latitude},${longitude}`,
    });

    // Prompt the user to choose between Google Maps and Apple Maps
    if (Platform.OS === 'ios') {
      Alert.alert(
        'Open in Maps',
        'Which app would you like to use for navigation?',
        [
          {
            text: 'Google Maps',
            onPress: () => Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`),
          },
          {
            text: 'Apple Maps',
            onPress: () => Linking.openURL(`http://maps.apple.com/?daddr=${latitude},${longitude}`),
          },
          {
            text: 'Cancel',
            style: 'cancel',
          },
        ],
        { cancelable: true }
      );
    } else {
      Linking.openURL(url);
    }
  } else {
    console.warn('User location not available.');
  }
};

export default function App({onlocationChange}) {

    const [userLocation, setUserLocation] = useState(1);
    const [userLocationAllData, setUserLocationAllData] = useState(1);

    

  const handleUserLocationChange = (event) => {
    const { coordinate } = event.nativeEvent;
    const { latitude, longitude } = event.nativeEvent.coordinate;


    setUserLocationAllData(coordinate);
    setUserLocation({ latitude, longitude });

    // console.log("location updated",userLocation);
    onlocationChange(userLocation);
    // Here you can update any other variables based on the user's location
  };

  


  return (
    <View style={styles.container}>
      <MapView style={styles.map} 
      provider={PROVIDER_GOOGLE}
      showsUserLocation
      showsMyLocationButton
    //   onMarkerPress
    //   onLongPress
    initialRegion={userLocation ? { // Use a ternary operator for conditional rendering
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        // latitudeDelta: 0.0922, // Adjust the latitude delta for zoom level
        // longitudeDelta: 0.0421,
        // You can optionally include other properties like latitudeDelta and longitudeDelta here
      } : undefined} 

      
    // )}


      onUserLocationChange={handleUserLocationChange}
      userLocationUpdateInterval={10000}
      maxZoomLevel={17}

    //   camera={1};
        mapType='SATELITE'
        // userInterfaceStyle='dark' //ios only
        // showsBuildings='true'
      />
            {/* <Button  onPress={handleNavigate} mode="contained" style={styles.btnav}>dsa</Button> */}

    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    height:100,
    borderWidth:1,
    marginBottom:50,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  btnav:{
    margin:20,
  },
});