import { View, Text, StyleSheet, Button ,RefreshControl , ScrollView } from "react-native";
import React, { useEffect, useState } from 'react';

// import Footer from './footer';
// import FooterScreen from './SettingsScreen';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('mydb.db');


export default function HomeScreen ({ navigation }) {
    const [data, setData] = useState([]);
    const [refreshing, setRefreshing] = useState(false);


  useEffect(() => {
    fetchDataFromDB();
  }, []);

  const fetchDataFromDB = () => {
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

    <View style={styles.container}>
    <ScrollView
      contentContainerStyle={styles.scrollView}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
    >
      <Text style={styles.text}>HomeScreen</Text>
      <Button
        title="GoTo About"
        onPress={() => navigation.navigate('Add Sale')}
      />
      <View style={styles.dataContainer}>
        {data.map(item => (
          <View key={item.id} style={styles.item}>
            <Text>First Name: {item.firstName}</Text>
            <Text>Last Name: {item.lastName}</Text>
            <Text>Framework: {item.framework}</Text>
            <Text>Items: {item.items}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  </View>
);
}
const styles = StyleSheet.create({
container: {
flex: 1,
alignItems: "center",
justifyContent: "center",
},
text: {
fontSize: 24,
fontWeight: "bold",
marginBottom: 16,
},
});