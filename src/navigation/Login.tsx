import React from 'react';
import { FaceCamera } from '../components/FaceCamera';

export const Login = () => {
  const handleFaceDetect = () => {};

  return <FaceCamera cameraDirection="front" onChange={handleFaceDetect} />;
};
