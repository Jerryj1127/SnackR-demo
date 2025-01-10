// NotificationManager.js

import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

class NotificationService {
  static async initialize() {
    try {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== 'granted') {
        console.log('Failed to get notification permissions');
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error initializing notifications:', error);
      return false;
    }
  }

  static async scheduleDailyNotification() {
    try {
        
      // Cancelling pre-existing notifications before registering new
      await Notifications.cancelAllScheduledNotificationsAsync();

      // @on next version: check user logged in today before pushing a notif
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Forgot your SnackR Streak ?",
          body: "Check in before its too late!",
        },
        trigger: {
          hour: 17, // Presetting it here instead of passing time as func params
          minute: 30,
          repeats: true,
        },
      });
    } catch (error) {
      console.error('Error scheduling notification:', error);
    }
  }
}

export default NotificationService;