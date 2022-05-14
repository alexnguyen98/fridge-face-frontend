import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { borderRadius, colors, textSize, textWeight } from '../../types/theme';
import { RootStackNavigationProps, RootStackRoutes } from '../../types/navigation';
import { useAnalytics } from '../../hooks/useAnalytics';
import { Button } from '../../components/common/Button';
import { Spacer } from '../../components/common/Spacer';
import Swiper from 'react-native-swiper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  wrapper: {
    backgroundColor: colors.white,
    flex: 1,
    borderRadius: borderRadius.xl,
    margin: 10,
  },
  title: {
    fontWeight: textWeight.bold,
    textAlign: 'center',
    fontSize: textSize['4xl'],
    lineHeight: 40,
    marginVertical: 40,
  },
  body: {
    fontSize: textSize.md,
    textAlign: 'center',
    lineHeight: 25,
    marginVertical: 5,
  },
  bold: {
    fontWeight: textWeight.bold,
  },
  qrcodeWrapper: {
    alignItems: 'center',
    marginVertical: 20,
  },
  qrcode: {
    width: 200,
    height: 200,
  },
  footer: {
    marginTop: 'auto',
    marginBottom: 50,
    paddingHorizontal: 30,
  },
  hint: {
    color: colors.gray[500],
    textAlign: 'center',
    marginBottom: 20,
  },
});

type Props = RootStackNavigationProps<RootStackRoutes.RegistrationWalkthrough>;

export const RegistrationWalkthrough: React.FC<Props> = ({ navigation }) => {
  const { logEvent } = useAnalytics();

  const handleNext = () => {
    logEvent('screen_view', {
      screen: RootStackRoutes.RegisterCamera,
    });

    navigation.navigate(RootStackRoutes.RegisterScan);
  };

  return (
    <View style={styles.container}>
      <Swiper loop={false} index={0} activeDotColor="#94a3b8" dot={<DotComponent />} activeDot={<DotComponent active />}>
        <View style={styles.wrapper}>
          <Text style={styles.title}>Connecting your account{'\n'} to Fridge Face</Text>
          <Text style={styles.body}>
            Visit on your phone or laptop https://corp.applifting.cz/admin/mobiles {'\n'}or use the QR code bellow
          </Text>
          <View style={styles.qrcodeWrapper}>
            <Image style={styles.qrcode} source={require('../../assets/corp-website.png')} />
          </View>
          <Text style={[styles.body, styles.bold]}>Ignore the Fridge app setup text on the site.</Text>
        </View>
        <View style={styles.wrapper}>
          <Text style={styles.title}>Using the user QR code</Text>
          <Text style={styles.body}>
            If you don't see a QR code on the site, click on "generate new QR code". {'\n'}After seeing it you can click on the Enroll face
            button.
          </Text>
          <View style={styles.footer}>
            <Text style={styles.hint}>
              Fridge face and Fridge app are two different apps, we will just use the QR code to link your account
            </Text>
            <Button onPress={handleNext}>Enroll Face</Button>
          </View>
        </View>
      </Swiper>
    </View>
  );
};

const DotComponent: React.FC<{ active?: boolean }> = ({ active }) => (
  <View
    style={{
      backgroundColor: colors.gray[active ? 500 : 300],
      width: active ? 14 : 12,
      height: active ? 14 : 12,
      borderRadius: 20,
      marginHorizontal: 5,
      marginVertical: 3,
    }}
  />
);
