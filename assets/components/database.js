// database.js

import * as SQLite from 'expo-sqlite';
import { Platform } from 'react-native';

let db;

export const initDatabase = () => {
  if (Platform.OS !== 'web') {
    db = SQLite.openDatabase('mydb.db');
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS Items (id INTEGER PRIMARY KEY AUTOINCREMENT, ShopName TEXT, Place TEXT, Items TEXT, Quantity TEXT, pkts TEXT, Date TEXT , Balance TEXT,Location TEXT);'
      );
    });
  }
};
export const dropTable =()=>
{
    if(Platform.OS!=='web')
    {
        db.transaction(tx => {
              tx.executeSql(
                'DROP TABLE IF EXISTS Items;'
              );
            });

    }
}

export const insertItem = (shopName, place, quantity, items, date, pkts,Balance,location) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO Items (shopName, Place, Quantity, Items, Date, pkts,Balance,Location) VALUES (?, ?, ?, ?, ?, ?, ?, ?);',
        [shopName, place, quantity, JSON.stringify(items), date, pkts,Balance,location],
        (_, result) => {
          resolve(result); // Resolve with the result of the insertion
        },
        (_, error) => {
          reject(error); // Reject with any errors that occur during insertion
        }
      );
    });
  });
};

// Add other database query functions as needed
