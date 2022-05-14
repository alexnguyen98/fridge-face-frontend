import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { Camera } from 'expo-camera';
import { colors, textSize, textWeight } from '../../types/theme';
import { RootStackNavigationProps, RootStackRoutes } from '../../types/navigation';
import { SERVER_URL } from '../../constants';
import { useAnalytics } from '../../hooks/useAnalytics';
import { useUserContext } from '../../context/UserContext';
import { FaceCamera } from '../../components/utils/FaceCamera';
import { HoleView } from '../../components/common/HoleView';
import { Countdown } from '../../components/register/Countdown';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textContainer: {
    position: 'absolute',
    alignItems: 'center',
    width: '100%',
    top: '85%',
    bottom: 0,
  },
  text: {
    fontWeight: textWeight.bold,
    fontSize: textSize['2xl'],
    color: colors.gray[500],
  },
});

type Props = RootStackNavigationProps<RootStackRoutes.RegisterCamera>;

export const RegistrationCamera: React.FC<Props> = ({ navigation, route }) => {
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState({
    started: false,
    finished: false,
  });

  const { logEvent } = useAnalytics();
  const { setUser } = useUserContext();

  const { user } = route.params;

  const handleFaceDetect = async (camera: Camera) => {
    if (!countdown.started) {
      return setCountdown((state) => ({ ...state, started: true }));
    }
    if (!countdown.finished) return;
    setLoading(true);
    try {
      const { uri } = await camera.takePictureAsync({
        quality: 0.5,
      });
      const res = await FileSystem.uploadAsync(SERVER_URL + '/user/register', uri, {
        uploadType: FileSystem.FileSystemUploadType.MULTIPART,
        fieldName: 'file',
        parameters: { user },
      });

      setUser(JSON.parse(res.body));

      logEvent('register_success');

      navigation.navigate(RootStackRoutes.LoginWelcome);
    } catch (err) {
      console.log(err);
    }
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
