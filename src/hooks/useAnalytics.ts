import * as Analytics from 'expo-firebase-analytics';

export const useAnalytics = () => {
  const logEvent = async (name: string, data?: any) => {
    await Analytics.setDebugModeEnabled(false);
    await Analytics.logEvent(name, data);
  };

  return { logEvent };
};
