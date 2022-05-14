import React, { useCallback, useState } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { colors } from '../../types/theme';
import { RootStackNavigationProps, RootStackRoutes } from '../../types/navigation';
import { useCartContext } from '../../context/CartContext';
import { useAnalytics } from '../../hooks/useAnalytics';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
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
  footer: {
    backgroundColor: colors.white,
    padding: 15,
  },
});

type Props = RootStackNavigationProps<RootStackRoutes.CartSearch>;

const ITEM_HEIGHT = 100;

export const CartSearch: React.FC<Props> = ({ navigation }) => {
  const [input, setInput] = useState('');
  const { products } = useCartContext();
  const { logEvent } = useAnalytics();

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

  const handleCheckout = () => {
    logEvent('screen_view', {
      screen: RootStackRoutes.CartCheckout,
    });

    navigation.navigate(RootStackRoutes.CartCheckout);
  };

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Input icon="search1" placeholder="Search product..." value={input} onChangeText={setInput} />
      </View>
      <FlatList data={filtered} renderItem={renderItem} keyExtractor={keyExtractor} getItemLayout={getItemLayout} />
      <View style={styles.footer}>
        <Button onPress={handleCheckout}>Cart</Button>
      </View>
    </View>
  );
};
