import React, { useState } from 'react';
import axios from 'axios';
import { Camera } from 'expo-camera';
import { FaceCamera } from '../components/FaceCamera';
import { SERVER_URL } from '../constants';

export const Registration = () => {
  const [loading, setLoading] = useState(false);

  const handleFaceDetect = async (camera: Camera) => {
    if (loading || !camera) return;
    setLoading(true);

    try {
      const { uri } = await camera.takePictureAsync();

      const uriArray = uri.split('.');
      const fileType = uriArray[uriArray.length - 1];

      const formData = new FormData();
      formData.append('user', {
        // @ts-ignore
        uri: uri.replace('file://', ''),
        name: `user.${fileType}`,
        mimetype: `image/${fileType}`,
      });

      console.log(formData.get('user'));

      // @ts-ignore
      for (var pair of formData.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
        console.log(formData.get(pair[0]));
      }

      const res = await axios.post(SERVER_URL + '/user/register', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return <FaceCamera cameraDirection="front" onChange={handleFaceDetect} />;
};
