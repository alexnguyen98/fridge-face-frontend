import * as Analytics from 'expo-firebase-analytics';

export const useAnalytics = () => {
  const logEvent = async (name: string, data?: any) => {
    try {
      await Analytics.setDebugModeEnabled(false);
      await Analytics.logEvent(name, data);
    } catch (err) {
      console.log(err);
    }
  };

  return { logEvent };
};
