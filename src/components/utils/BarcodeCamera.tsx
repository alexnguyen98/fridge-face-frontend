import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Camera, BarCodeScanningResult } from 'expo-camera';
import { usePermission } from '../../hooks/usePermission';

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

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return <Camera type={cameraDirection} onBarCodeScanned={handleBarCodeScanned} style={styles.camera} autoFocus="on" />;
};
