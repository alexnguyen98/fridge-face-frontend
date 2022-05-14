import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { RootStackNavigationProps, RootStackRoutes } from '../types/navigation';
import { borderRadius, colors, textSize, textWeight } from '../types/theme';
import { useAnalytics } from '../hooks/useAnalytics';
import { Spacer } from '../components/common/Spacer';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    marginTop: 10,
    marginLeft: 5,
    letterSpacing: 8,
    fontSize: textSize['2xl'],
    fontWeight: textWeight.bold,
    color: colors.gray[400],
  },
  main: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: '30%',
    padding: 30,
  },
  button: {
    borderRadius: borderRadius.md,
    backgroundColor: colors.white,
    padding: 30,
    flex: 1,
  },
  text: {
    fontSize: textSize['3xl'],
    fontWeight: textWeight.bold,
  },
});

type Props = RootStackNavigationProps<RootStackRoutes.Home>;

export const Home: React.FC<Props> = ({ navigation }) => {
  const { logEvent } = useAnalytics();

  const handleRedirect = (route: RootStackRoutes) => {
    logEvent('screen_view', {
      screen: route,
    });

    navigation.navigate(route);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialCommunityIcons name="fridge-outline" size={60} color={colors.primary[400]} />
        <Text style={styles.title}>FRIDGE FACE</Text>
      </View>
      <View style={styles.main}>
        <Item title="Login" onChange={() => handleRedirect(RootStackRoutes.LoginCamera)} />
        <Spacer horizontal />
        <Item title="Register" onChange={() => handleRedirect(RootStackRoutes.RegistrationWalkthrough)} />
      </View>
    </View>
  );
};

const Item: React.FC<{ title: string; onChange: () => void }> = ({ title, onChange }) => (
  <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={onChange}>
    <Text style={styles.text}>{title}</Text>
  </TouchableOpacity>
);
