import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Camera, FaceDetectionResult } from 'expo-camera';
import { Face } from 'expo-camera/build/Camera.types';
import * as FaceDetector from 'expo-face-detector';
import { usePermission } from '../../hooks/usePermission';

const faceDetectorSettings = {
  mode: FaceDetector.FaceDetectorMode.accurate,
  detectLandmarks: FaceDetector.FaceDetectorLandmarks.none,
  runClassifications: FaceDetector.FaceDetectorClassifications.none,
  minDetectionInterval: 1000,
};

const styles = StyleSheet.create({
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
  },
  button: {
    padding: 10,
    backgroundColor: 'black',
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
});

type Props = {
  cameraDirection: 'front' | 'back';
  active: boolean;
  onChange: (camera: Camera) => void;
};

export const FaceCamera: React.FC<Props> = ({ cameraDirection, active, onChange }) => {
  const [faceRes, setFaceRes] = useState<Face | null>(null);
  const ref = useRef<Camera>(null);

  const { hasPermission } = usePermission();

  const handleFacesDetected = (result: FaceDetectionResult) => {
    const data = result.faces[0];
    setFaceRes(data);
    if (data && data.bounds.origin.x > 0 && data.bounds.origin.y > 0 && -15 < data.yawAngle && data.yawAngle < 15) {
      onChange(ref.current as Camera);
    }
  };

  const boxStyle = {
    width: faceRes?.bounds.size.width,
    height: faceRes?.bounds.size.height,
    left: faceRes?.bounds.origin.x,
    top: faceRes?.bounds.origin.y,
    position: 'absolute',
    borderColor: 'blue',
    borderWidth: 1,
  };

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <Camera
      ref={ref}
      type={cameraDirection}
      onFacesDetected={active ? handleFacesDetected : undefined}
      faceDetectorSettings={faceDetectorSettings}
      autoFocus={Camera.Constants.AutoFocus.on}
      style={styles.camera}
    >
      <View style={styles.buttonContainer}>{faceRes && <View style={boxStyle as any}></View>}</View>
    </Camera>
  );
};
