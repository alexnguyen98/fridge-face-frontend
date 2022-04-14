import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { Spacer } from '../../components/common/Spacer';
import { RootStackNavigationProps, RootStackRoutes, LoginStackRoutes, CartStackRoutes } from '../../types/navigation';
import { colors, textSize, textWeight } from '../../types/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 200 / 2,
    borderWidth: 5,
    borderColor: '#a4ddf8',
    overflow: 'hidden',
  },
  text: {
    fontSize: textSize['md'],
    fontWeight: textWeight.medium,
    color: colors.gray[500],
  },
});

type Props = RootStackNavigationProps<LoginStackRoutes.LoginWelcome>;

export const Welcome: React.FC<Props> = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.goBack();
      navigation.navigate(RootStackRoutes.Cart, {
        screen: CartStackRoutes.CartCamera,
      });
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        resizeMode="cover"
        source={{
          uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Official_portrait_of_Barack_Obama.jpg/1200px-Official_portrait_of_Barack_Obama.jpg',
        }}
      />
      <Spacer size={20} />
      <Text style={styles.text}>Welcome Alex Nguyen</Text>
    </View>
  );
};
