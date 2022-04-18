import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Camera } from 'expo-camera';
import { FaceCamera } from '../../components/utils/FaceCamera';
import { HoleView } from '../../components/common/HoleView';
import { colors, textSize, textWeight } from '../../types/theme';
import { LoginStackRoutes, RegisterStackRoutes, RootStackNavigationProps, RootStackRoutes } from '../../types/navigation';

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

  const handleFaceDetect = async (camera: Camera) => {
    if (loading || !camera) return;
    setLoading(true);

    navigation.popToTop();
    navigation.navigate(RootStackRoutes.Login, {
      screen: LoginStackRoutes.LoginWelcome,
    });
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
