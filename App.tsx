import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera, FaceDetectionResult, PermissionStatus } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';
import { Face } from 'expo-camera/build/Camera.types';

const faceDetectorSettings = {
  mode: FaceDetector.Constants.Mode.accurate,
  detectLandmarks: FaceDetector.Constants.Landmarks.none,
  minDetectionInterval: 1000,
};

export default function App() {
  const [hasPermission, setHasPermission] = useState(false);
  const [faceRes, setFaceRes] = useState<Face | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === PermissionStatus.GRANTED);
    })();
  }, []);

  const handleFacesDetected = (result: FaceDetectionResult) => {
    const data = result.faces[0];
    setFaceRes(data);
  };

  const handleLoad = () => {
    console.log('gay');
  };

  const boxStyle = () => ({
    width: faceRes?.bounds.size.width,
    height: faceRes?.bounds.size.height,
    left: faceRes?.bounds.origin.x,
    top: faceRes?.bounds.origin.y,
    position: 'absolute',
    borderColor: 'blue',
    borderWidth: 5,
  });

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={Camera.Constants.Type.front}
        onFacesDetected={handleFacesDetected}
        faceDetectorSettings={faceDetectorSettings}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleLoad}>
            <Text style={styles.text}>Load model</Text>
          </TouchableOpacity>
          {/* @ts-ignore */}
          {faceRes && <View style={boxStyle()}></View>}
        </View>
      </Camera>
    </View>
  );
}

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
    zIndex: 1,
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
