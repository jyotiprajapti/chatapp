import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

const checkAndRequestNotificationPermission = async () => {
  const status = await check(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
console.log("status", status)
  switch (status) {
    case RESULTS.UNAVAILABLE:
      console.log('This feature is not available on this device.');
      break;
    case RESULTS.GRANTED:
      console.log('Notification permission already granted.');
      break;
    case RESULTS.DENIED:
      console.log('Notification permission denied but requestable. Requesting now...');
      const newStatus = await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
      if (newStatus === RESULTS.GRANTED) {
        console.log('Notification permission granted.');
      } else {
        console.log('Notification permission denied.');
      }
      break;
    case RESULTS.BLOCKED:
      console.log('Notification permission is blocked and not requestable.');
      break;
    default:
      console.log('Unhandled permission status:', status);
  }
};

export default checkAndRequestNotificationPermission;
