import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Camera, BarCodeScanningResult } from 'expo-camera';
import { usePermission } from '../../hooks/usePermission';
import { BarCodeScanner } from 'expo-barcode-scanner';

const barCodeScannerSettings = {
  barCodeTypes: [BarCodeScanner.Constants.BarCodeType.ean13, BarCodeScanner.Constants.BarCodeType.qr],
};

const styles = StyleSheet.create({
  camera: {
    flex: 1,
  },
});

type Props = {
  cameraDirection: 'front' | 'back';
  onChange: (barcode: string) => void;
};

export const BarcodeCamera: React.FC<Props> = ({ cameraDirection, onChange }) => {
  const [activeBarcode, setActiveBarcode] = useState('');

  const { hasPermission } = usePermission();

  const handleBarCodeScanned = (barcode: BarCodeScanningResult) => {
    if (barcode.data === activeBarcode) return;
    setActiveBarcode(barcode.data);
    onChange(barcode.data);
  };

  useEffect(() => {
    if (activeBarcode) {
      const timer = setTimeout(() => setActiveBarcode(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [activeBarcode]);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <Camera
      type={cameraDirection}
      onBarCodeScanned={handleBarCodeScanned}
      style={styles.camera}
      barCodeScannerSettings={barCodeScannerSettings}
      autoFocus="on"
    />
  );
};
