import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Input } from '../../components/common/Input';
import { Spacer } from '../../components/common/Spacer';
import { RegistrationInfoItems } from '../../components/register/RegisterInfoItems';

const items = ['ALN', 'KAJ', 'KOP', 'TEO', 'TRP', 'ROV', 'OMO', 'RAW'];

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
  },
});

export const RegistrationInfo = () => {
  const [input, setInput] = useState('');
  const [activeUser, setActiveUser] = useState('');

  const handleActiveUser = (user: string) => setActiveUser((state) => (state === user ? '' : user));

  const filteredItems = () => items.filter((i) => i.includes(input?.toUpperCase()));

  return (
    <View style={styles.container}>
      <Input value={input} onChangeText={setInput} />
      <Spacer />
      <RegistrationInfoItems items={filteredItems()} active={activeUser} onChange={handleActiveUser} />
    </View>
  );
};
