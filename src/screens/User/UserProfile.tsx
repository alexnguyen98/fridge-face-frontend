import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { colors, textSize, textWeight } from '../../types/theme';
import { SERVER_URL } from '../../constants';
import { useUserContext } from '../../context/UserContext';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageWrapper: {
    padding: 15,
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 200 / 2,
    overflow: 'hidden',
  },
  title: {
    marginBottom: 30,
    textAlign: 'center',
    fontSize: textSize['2xl'],
    fontWeight: textWeight.medium,
  },
  block: {
    padding: 15,
    borderTopWidth: 1,
    borderColor: colors.gray[200],
    backgroundColor: colors.white,
  },
  text: {
    fontSize: textSize.md,
  },
  balance: {
    color: 'red',
  },
  flex: {
    flexDirection: 'row',
  },
});

export const UserProfile = () => {
  const [balance, setBalance] = useState(0);
  const { user } = useUserContext();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(SERVER_URL + '/user/balance', {
          headers: {
            token: user.token,
          },
        });
        setBalance(data.balance);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image
          style={styles.image}
          resizeMode="cover"
          source={{
            uri: `${SERVER_URL}/uploads/${user.info?.nickname}.jpg`,
          }}
        />
      </View>
      <Text style={styles.title}>{user.info?.name}</Text>
      <View style={styles.block}>
        <Text style={styles.text}>Nickname: {user.info?.nickname}</Text>
      </View>
      <View style={[styles.block, styles.flex]}>
        <Text style={styles.text}>Balance: </Text>
        <Text style={styles.balance}>{balance} CZK</Text>
      </View>
    </View>
  );
};
