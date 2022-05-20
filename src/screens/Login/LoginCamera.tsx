import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { Camera } from 'expo-camera';
import { colors, textSize, textWeight } from '../../types/theme';
import { RootStackNavigationProps, RootStackRoutes } from '../../types/navigation';
import { SERVER_URL } from '../../constants';
import { useFailure } from '../../hooks/useFailure';
import { useAnalytics } from '../../hooks/useAnalytics';
import { useUserContext } from '../../context/UserContext';
import { FaceCamera } from '../../components/utils/FaceCamera';
import { HoleView } from '../../components/common/HoleView';
import { Button } from '../../components/common/Button';
import { Spacer } from '../../components/common/Spacer';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textContainer: {
    position: 'absolute',
    alignItems: 'center',
    width: '100%',
    top: '83%',
    bottom: 0,
  },
  text: {
    fontWeight: textWeight.bold,
    fontSize: textSize['2xl'],
    color: colors.gray[500],
  },
  tryAgain: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  hint: {
    color: colors.gray[500],
    marginTop: 15,
  },
});

type Props = RootStackNavigationProps<RootStackRoutes.LoginCamera>;

export const LoginCamera: React.FC<Props> = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  const { logEvent } = useAnalytics();
  const { setUser } = useUserContext();
  const { failed, increaseFailure, resetFailure } = useFailure();

  const handleFaceDetect = async (camera: Camera) => {
    if (loading || !camera || failed) return;
    setLoading(true);
    try {
      const { uri } = await camera.takePictureAsync({
        quality: 0.5,
      });
      const res = await FileSystem.uploadAsync(SERVER_URL + '/user/login', uri, {
        uploadType: FileSystem.FileSystemUploadType.MULTIPART,
        fieldName: 'user',
      });

      const data = JSON.parse(res.body);
      if (data?.token) {
        setUser(data as any);

        logEvent('login_success', {
          attempts: failed,
        });

        navigation.navigate(RootStackRoutes.LoginWelcome);
      } else {
        console.log('not recognised');
        increaseFailure();
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <FaceCamera cameraDirection="front" active={!loading} onChange={handleFaceDetect} />
      <HoleView />
      <View style={styles.textContainer}>
        {failed ? (
          <View style={styles.tryAgain}>
            <Text style={styles.text}>Face not recognised, please try again</Text>
            <Spacer />
            <Button onPress={resetFailure}>Try again</Button>
          </View>
        ) : (
          <Text style={styles.text}>{loading ? 'Processing...' : 'Searching for face...'}</Text>
        )}
        <Text style={styles.hint}>Beards and glasses may influence the results</Text>
      </View>
    </View>
  );
};
