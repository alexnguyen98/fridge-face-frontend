import { useHeaderHeight } from '@react-navigation/elements';
import React, { useState } from 'react';
import { StyleSheet, View, Platform, KeyboardAvoidingView } from 'react-native';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Spacer } from '../../components/common/Spacer';
import { RegistrationInfoItems } from '../../components/register/RegisterInfoItems';
import { RegisterStackProps, RegisterStackRoutes } from '../../types/navigation';

const items = ['ALN', 'KAJ', 'KOP', 'TEO', 'TRP', 'ROV', 'OMO', 'RAW'];

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
  },
  body: {
    flex: 1,
  },
  footer: {
    marginVertical: 12,
  },
});

type Props = RegisterStackProps<RegisterStackRoutes.RegisterInfo>;

export const RegistrationInfo: React.FC<Props> = ({ navigation }) => {
  const [input, setInput] = useState('');
  const [activeUser, setActiveUser] = useState('');

  const handleActiveUser = (user: string) => setActiveUser((state) => (state === user ? '' : user));

  const filteredItems = () => items.filter((i) => i.includes(input?.toUpperCase()));

  const headerHeight = useHeaderHeight();

  const handleNext = () => {
    navigation.navigate(RegisterStackRoutes.RegisterCamera, {
      user: activeUser,
    });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      keyboardVerticalOffset={headerHeight}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.body}>
        <Input value={input} onChangeText={setInput} />
        <Spacer />
        <RegistrationInfoItems items={filteredItems()} active={activeUser} onChange={handleActiveUser} />
      </View>
      <View style={styles.footer}>
        <Button onPress={handleNext} disabled={!activeUser}>
          Next
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
};
