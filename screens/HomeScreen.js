import { View, Text, StyleSheet ,RefreshControl , ScrollView, Platform } from "react-native";
import React, { useEffect, useState } from 'react';
// import CardModal from './card-modal';
import styles from "./styles";
import { Avatar,Button, Card } from "react-native-paper";

// import DataTable from './datatable.js';





const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;




// import Footer from './footer';
// import FooterScreen from './SettingsScreen';
let db;
if (Platform.OS !== 'web') {
  // Dynamically import SQLite for non-web platforms
  import('expo-sqlite').then(SQLite => {
    db = SQLite.openDatabase('mydb.db');
  }).catch(error => {
    console.error('Error importing SQLite:', error);
  });
}

export default function HomeScreen ({ navigation }) {
    const [data, setData] = useState([]);
    const [refreshing, setRefreshing] = useState(false);


  useEffect(() => {
    fetchDataFromDB();
  }, []);

  const fetchDataFromDB = () => {
    if (!db) {
      console.warn('SQLite database is not available.');
      return;
    }
    
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM Items;', [], (_, { rows: { _array } }) => {
        setData(_array);
      });
    });
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchDataFromDB();
    setRefreshing(false);
  };
  
return (

    <View style={styles.homeContainer}>
    <ScrollView
      contentContainerStyle={styles.scrollView}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
    >
      {/* <Text style={styles.text}>HomeScreen</Text> */}
      
      <View style={styles.homeCardContainer}>
      {/* <DataTable />, */}

        {data.map(item => (
          console.log(item),
          <View key={item.id} style={styles.homecarditem}>
            {/* <Text>First Name: {item.firstName}</Text>
            <Text>Last Name: {item.lastName}</Text>
            <Text>Framework: {item.framework}</Text>
            <Text>Items: {JSON.parse(item.items)}</Text> */}
            <Card style={styles.cardBox} mode="contained">
        <Card.Title
          title={item.firstName}
          subtitle={item.place} 
          left={LeftContent}
        />
        <Card.Content>
          <Text variant="titleLarge">{item.framework}</Text>
          <Text variant="bodyMedium">{item.lastName}</Text>
        </Card.Content>
        <Card.Cover source={{ uri: "https://picsum.photos/700" }} style={styles.img} />
        <Card.Actions>
          <Button>Navigate</Button>
          <Button>Add sale</Button>
          


        </Card.Actions>
      </Card>

          </View>
        ))}
      </View>
      <Button
        title="GoTo About"
        onPress={() => navigation.navigate('Add Sale')}
      >GoTo About</Button>
      <Card style={styles.cardBox} mode="contained">
        <Card.Title
          title="Card Title"
          subtitle="Card Subtitle"
          left={LeftContent}
        />
        <Card.Content>
          <Text variant="titleLarge">Card title</Text>
          <Text variant="bodyMedium">Card content</Text>
        </Card.Content>
        <Card.Cover source={{ uri: "https://picsum.photos/700" }} style={styles.img} />
        <Card.Actions>
          <Button>Edit Sale</Button>
          <Button>Add sale</Button>
          


        </Card.Actions>
      </Card>
       
    </ScrollView>
    
  </View>
);
}
// const styles = StyleSheet.create({
// container: {
// flex: 1,
// alignItems: "center",
// justifyContent: "center",
// },
// text: {
// fontSize: 24,
// fontWeight: "bold",
// marginBottom: 16,
// },
// });