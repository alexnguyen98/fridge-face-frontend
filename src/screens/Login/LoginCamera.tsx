import React from 'react';
import { FaceCamera } from '../../components/FaceCamera';

export const LoginCamera = () => {
  const handleFaceDetect = () => {};

  return <FaceCamera cameraDirection="front" onChange={handleFaceDetect} />;
};
