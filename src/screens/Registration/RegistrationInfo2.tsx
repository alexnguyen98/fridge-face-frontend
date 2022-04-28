import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { borderRadius, colors, textSize, textWeight } from '../../types/theme';
import { RegisterStackProps, RegisterStackRoutes } from '../../types/navigation';
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

type Props = RegisterStackProps<RegisterStackRoutes.RegisterInfo>;

export const RegistrationInfo2: React.FC<Props> = ({ navigation }) => {
  const handleBarcode = async (qrcode: string) => {
    const split = qrcode.split(':');
    if (split[1]) {
      navigation.navigate(RegisterStackRoutes.RegisterCamera, {
        user: split[1],
      });
    }
  };

  return (
    <View style={styles.container}>
      <BarcodeCamera cameraDirection="front" onChange={handleBarcode} />
      <View style={styles.wrapper}>
        <View style={styles.notice}>
          <Text style={styles.text}>Scan Fridge app QR code{'\n'} from corplifting</Text>
        </View>
      </View>
    </View>
  );
};