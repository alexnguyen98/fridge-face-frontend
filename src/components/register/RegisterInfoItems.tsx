import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { colors } from '../../types/theme';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
    margin: 5,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  buttonText: {
    fontSize: 20,
  },
});

type Props = {
  items: string[];
  active: string;
  onChange: (user: string) => void;
};

export const RegistrationInfoItems: React.FC<Props> = ({ items, active, onChange }) => {
  return (
    <View style={styles.container}>
      {items.map((i) => (
        <TouchableOpacity
          key={i}
          style={[styles.button, { backgroundColor: active === i ? colors.gray[500] : colors.gray[300] }]}
          onPress={() => onChange(i)}
        >
          <Text style={styles.buttonText}>{i}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
