import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { StackActions } from '@react-navigation/native';
import * as FileSystem from 'expo-file-system';
import { Camera } from 'expo-camera';
import { FaceCamera } from '../../components/utils/FaceCamera';
import { HoleView } from '../../components/common/HoleView';
import { Countdown } from '../../components/register/Countdown';
import { SERVER_URL } from '../../constants';
import { LoginStackRoutes, RegisterStackRoutes, RootStackNavigationProps, RootStackRoutes } from '../../types/navigation';
import { colors, textSize, textWeight } from '../../types/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textContainer: {
    position: 'absolute',
    alignItems: 'center',
    width: '100%',
    height: '28%',
    bottom: 0,
  },
  text: {
    fontWeight: textWeight.bold,
    fontSize: textSize.xl,
    color: colors.gray[500],
  },
});

type Props = RootStackNavigationProps<RegisterStackRoutes.RegisterCamera>;

export const RegistrationCamera: React.FC<Props> = ({ navigation, route }) => {
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState({
    started: false,
    finished: false,
  });

  const { user } = route.params;

  const handleFaceDetect = async (camera: Camera) => {
    if (!countdown.started) {
      return setCountdown((state) => ({ ...state, started: true }));
    }
    if (!countdown.finished) return;
    setLoading(true);
    // try {
    //   const { uri } = await camera.takePictureAsync({
    //     quality: 0.5,
    //   });
    //   const res = await FileSystem.uploadAsync(SERVER_URL + '/user/register', uri, {
    //     uploadType: FileSystem.FileSystemUploadType.MULTIPART,
    //     fieldName: 'user',
    //   });
    //   console.log(res.body);
    // } catch (err) {
    //   console.log(err);
    // }

    navigation.popToTop();
    navigation.replace(RootStackRoutes.Login, {
      screen: LoginStackRoutes.LoginWelcome,
    });
  };

  const handleCountdown = () => setCountdown((state) => ({ ...state, finished: true }));

  return (
    <View style={styles.container}>
      <FaceCamera cameraDirection="front" active={!loading} onChange={handleFaceDetect} />
      <HoleView />
      <View style={styles.textContainer}>
        {loading ? (
          <Text style={styles.text}>Processing...</Text>
        ) : (
          <>
            <Text style={styles.text}>Taking a profile picture in</Text>
            {countdown.started && <Countdown start={4} onFinish={handleCountdown} />}
          </>
        )}
      </View>
    </View>
  );
};
