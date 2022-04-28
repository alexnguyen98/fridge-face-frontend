import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { Camera } from 'expo-camera';
import { useUserContext } from '../../context/UserContext';
import { FaceCamera } from '../../components/utils/FaceCamera';
import { HoleView } from '../../components/common/HoleView';
import { SERVER_URL } from '../../constants';
import { colors, textSize, textWeight } from '../../types/theme';
import { LoginStackRoutes, RegisterStackRoutes, RootStackNavigationProps, RootStackRoutes } from '../../types/navigation';
import { useFailure } from '../../hooks/useFailure';

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

type Props = RootStackNavigationProps<LoginStackRoutes.LoginCamera>;

export const LoginCamera: React.FC<Props> = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const { setUser } = useUserContext();
  const { failed, increaseFailure } = useFailure();

  const handleFaceDetect = async (camera: Camera) => {
    console.log('centered and rotated');
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

        navigation.popToTop();
        navigation.navigate(RootStackRoutes.Login, {
          screen: LoginStackRoutes.LoginWelcome,
        });
      } else {
        console.log('not recoginised');
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
        <Text style={styles.text}>{loading ? 'Processing...' : 'Searching for face...'}</Text>
      </View>
    </View>
  );
};
