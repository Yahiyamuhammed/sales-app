import React ,{useState} from 'react';
import MapView,{PROVIDER_GOOGLE} from 'react-native-maps';
import { StyleSheet, View ,Button,Linking,Platform,Alert} from 'react-native';
import { layer } from '@fortawesome/fontawesome-svg-core';

export default function App() {

    const [userLocation, setUserLocation] = useState(1);
    const [userLocationAllData, setUserLocationAllData] = useState(1);

    

  const handleUserLocationChange = (event) => {
    const { coordinate } = event.nativeEvent;
    const { latitude, longitude } = event.nativeEvent.coordinate;


    setUserLocationAllData(coordinate);
    setUserLocation({ latitude, longitude });

    console.log("location updated",userLocation);
    // Here you can update any other variables based on the user's location
  };

  const handleNavigate = () => {
    if (userLocation) {
      const { latitude, longitude } = userLocation;
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

    //   camera={1};
        mapType='STARNDARD'
        // userInterfaceStyle='dark' //ios only
        // showsBuildings='true'
      />
            <Button title="Navigate" onPress={handleNavigate} />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  map: {
    width: '100%',
    height: '100%',
    borderWidth:1,
  },
});
