import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Camera, FaceDetectionResult, PermissionStatus } from 'expo-camera';
import { Face } from 'expo-camera/build/Camera.types';
import * as FaceDetector from 'expo-face-detector';

const faceDetectorSettings = {
  mode: FaceDetector.FaceDetectorMode.accurate,
  detectLandmarks: FaceDetector.FaceDetectorLandmarks.none,
  runClassifications: FaceDetector.FaceDetectorClassifications.none,
  minDetectionInterval: 1000,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
  onChange: (camera: Camera) => void;
};

export const FaceCamera: React.FC<Props> = ({ cameraDirection, onChange }) => {
  const [hasPermission, setHasPermission] = useState(false);
  const [faceRes, setFaceRes] = useState<Face | null>(null);
  const ref = useRef<Camera>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === PermissionStatus.GRANTED);
    })();
  }, []);

  const handleFacesDetected = (result: FaceDetectionResult) => {
    const data = result.faces[0];
    setFaceRes(data);
    if (data) {
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
    borderWidth: 5,
  };

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={ref}
        style={styles.camera}
        type={cameraDirection}
        onFacesDetected={handleFacesDetected}
        faceDetectorSettings={faceDetectorSettings}
        autoFocus="on"
      >
        <View style={styles.buttonContainer}>{faceRes && <View style={boxStyle as any}></View>}</View>
      </Camera>
    </View>
  );
};
