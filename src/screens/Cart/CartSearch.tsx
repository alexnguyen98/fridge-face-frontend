import React, { useCallback, useState } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { useCartContext } from '../../context/CartContext';
import { Input } from '../../components/common/Input';
import { ProductPreview } from '../../components/cart/ProductPreview';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    padding: 20,
  },
  list: {
    flex: 1,
  },
});

const ITEM_HEIGHT = 100;

export const CartSearch = () => {
  const [input, setInput] = useState('');
  const { products } = useCartContext();

  const filtered = Object.values(products).filter((i) => i.name.toLowerCase().includes(input?.toLowerCase()));

  const renderItem = useCallback(({ item }) => <ProductPreview id={item.id} />, []);
  const keyExtractor = useCallback((item) => item.id, []);
  const getItemLayout = useCallback(
    (_, index) => ({
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index,
      index,
    }),
    []
  );

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Input icon="search1" value={input} onChangeText={setInput} />
      </View>
      <FlatList data={filtered} renderItem={renderItem} keyExtractor={keyExtractor} getItemLayout={getItemLayout} />
    </View>
  );
};
