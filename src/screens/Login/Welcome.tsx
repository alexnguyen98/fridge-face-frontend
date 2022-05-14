import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { RootStackNavigationProps, RootStackRoutes } from '../../types/navigation';
import { colors, textSize, textWeight } from '../../types/theme';
import { SERVER_URL } from '../../constants';
import { useUserContext } from '../../context/UserContext';
import { Spacer } from '../../components/common/Spacer';

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
    fontSize: textSize['2xl'],
    fontWeight: textWeight.medium,
    color: colors.gray[500],
  },
});

type Props = RootStackNavigationProps<RootStackRoutes.LoginWelcome>;

export const Welcome: React.FC<Props> = ({ navigation }) => {
  const { user } = useUserContext();

  useEffect(() => {
    setTimeout(() => {
      navigation.popToTop();
      navigation.navigate(RootStackRoutes.CartCamera);
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        resizeMode="cover"
        source={{
          uri: `${SERVER_URL}/uploads/${user.info?.nickname}.jpg`,
        }}
      />
      <Spacer size={20} />
      <Text style={styles.text}>Welcome {user.info?.name}</Text>
    </View>
  );
};
