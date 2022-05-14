import React from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import { borderRadius, colors, textSize, textWeight } from '../../types/theme';
import { RootStackNavigationProps, RootStackRoutes } from '../../types/navigation';
import { useAnalytics } from '../../hooks/useAnalytics';
import { BarcodeCamera } from '../../components/utils/BarcodeCamera';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: '100%',
    padding: 15,
  },
  notice: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: colors.gray[800],
    borderRadius: borderRadius.md,
  },
  text: {
    textAlign: 'center',
    fontWeight: textWeight.md,
    fontSize: textSize.sm,
    color: colors.gray[200],
  },
});

type Props = RootStackNavigationProps<RootStackRoutes.RegisterScan>;

export const RegistrationScan: React.FC<Props> = ({ navigation }) => {
  const { logEvent } = useAnalytics();

  const handleBarcode = async (qrcode: string) => {
    const split = qrcode.split(':');
    if (split[1] && (split[0].includes('applifting') || split[0].includes('dxheroes'))) {
      logEvent('screen_view', {
        screen: RootStackRoutes.RegisterCamera,
      });

      navigation.navigate(RootStackRoutes.RegisterCamera, {
        user: split[1],
      });
    } else {
      Alert.alert('QR code not recognised');
    }
  };

  return (
    <View style={styles.container}>
      <BarcodeCamera cameraDirection="front" onChange={handleBarcode} />
      <View style={styles.wrapper}>
        <View style={styles.notice}>
          <Text style={styles.text}>Scan the user QR code</Text>
        </View>
      </View>
    </View>
  );
};
