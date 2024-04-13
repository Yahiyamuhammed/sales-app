import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';

export default function App() {
  const [products, setProducts] = useState([
    { id: '1', name: 'Product 1' },
    { id: '2', name: 'Product 2' },
    // Add more products as needed
  ]);
  const [selectedProducts, setSelectedProducts] = useState({});

  const handleSelectProduct = (id) => {
    setSelectedProducts({ ...selectedProducts, [id]: 1 });
  };

  const handleSetQuantity = (quantity, id) => {
    if (selectedProducts[id]) {
      setSelectedProducts({ ...selectedProducts, [id]: quantity });
    }
  };

  return (
    <View>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Button title={`Select ${item.name}`} onPress={() => handleSelectProduct(item.id)} />
            {selectedProducts[item.id] && (
              <TextInput
                value={String(selectedProducts[item.id])}
                onChangeText={(quantity) => handleSetQuantity(Number(quantity), item.id)}
                keyboardType="numeric"
              />
            )}
          </View>
        )}
      />
      <View>
        <Text>Selected Products:</Text>
        {Object.entries(selectedProducts).map(([id, quantity]) => {
          const product = products.find((product) => product.id === id);
          return (
            <Text key={id}>
              {product.name}: {quantity}
            </Text>
          );
        })}
      </View>
    </View>
  );
}
