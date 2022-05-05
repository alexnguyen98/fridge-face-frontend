import React from 'react';
import { StyleSheet, View, Text, ScrollView, Image } from 'react-native';
import * as Analytics from 'expo-firebase-analytics';
import { borderRadius, colors, textSize, textWeight } from '../../types/theme';
import { RegisterStackProps, RegisterStackRoutes } from '../../types/navigation';
import { Button } from '../../components/common/Button';
import { Spacer } from '../../components/common/Spacer';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontWeight: textWeight.bold,
    textAlign: 'center',
    fontSize: textSize['4xl'],
    marginVertical: 30,
  },
  body: {
    fontSize: textSize.md,
    textAlign: 'center',
  },
  qrcodeWrapper: {
    alignItems: 'center',
    marginVertical: 20,
  },
  qrcode: {
    width: 200,
    height: 200,
  },
  hint: {
    color: colors.gray[500],
    textAlign: 'center',
    marginBottom: 10,
  },
});

type Props = RegisterStackProps<RegisterStackRoutes.RegisterInfo>;

export const RegistrationInfo2: React.FC<Props> = ({ navigation }) => {
  const handleNext = () => {
    Analytics.logEvent('screen_view', {
      screen: RegisterStackRoutes.RegisterCamera,
    });

    navigation.navigate(RegisterStackRoutes.RegisterScan);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Linking account</Text>
        <Text style={styles.body}>
          1. Visit on your mobile phone or laptop the corplifting site{'\n'} and then navigate to the Fridge App link from the navbar.
        </Text>
        <Spacer />
        <Text style={styles.body}>Or scan the QR code to the website bellow.</Text>
        <View style={styles.qrcodeWrapper}>
          <Image style={styles.qrcode} source={require('../../assets/corp-website.png')} />
        </View>
        <Spacer size={30} />
        <Text style={styles.body}>2. You will find your user QR code to setup Fridge app</Text>
      </ScrollView>
      <Text style={styles.hint}>We will use this QR code to link your account to the system</Text>
      <Button onPress={handleNext}>Next</Button>
    </View>
  );
};
