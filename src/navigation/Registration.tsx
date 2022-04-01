import React, { useState } from 'react';
import axios from 'axios';
import * as FileSystem from 'expo-file-system';
import { Camera } from 'expo-camera';
import { FaceCamera } from '../components/FaceCamera';
import { SERVER_URL } from '../constants';

export const Registration = () => {
  const [loading, setLoading] = useState(false);

  const handleFaceDetect = async (camera: Camera) => {
    if (loading || !camera) return;
    setLoading(true);

    try {
      const { uri } = await camera.takePictureAsync({
        quality: 0.5,
      });
      const res = await FileSystem.uploadAsync(SERVER_URL + '/user/register', uri, {
        uploadType: FileSystem.FileSystemUploadType.MULTIPART,
        fieldName: 'user',
      });
      console.log(res.body);
    } catch (err) {
      console.log(err);
    }
  };

  return <FaceCamera cameraDirection="front" onChange={handleFaceDetect} />;
};
