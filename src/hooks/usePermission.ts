import { useState, useEffect } from 'react';
import { Camera, PermissionStatus } from 'expo-camera';

export const usePermission = () => {
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === PermissionStatus.GRANTED);
    })();
  }, []);

  return { hasPermission };
};
