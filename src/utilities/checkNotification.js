import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

const checkAndRequestNotificationPermission = async () => {
  try {
    const status = await check(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);

    switch (status) {
      case RESULTS.UNAVAILABLE:
        break;
      case RESULTS.GRANTED:
        break;
      case RESULTS.DENIED:
        const newStatus = await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
        if (newStatus === RESULTS.GRANTED) {
        } else {
          console.log('Notification permission denied.');
        }
        break;
      case RESULTS.BLOCKED:
        break;
      default:
        console.log('Unhandled permission status:', status);
    }
  } catch (error) {
    console.error("Error checking notification permissions:", error);
  }
};

export default checkAndRequestNotificationPermission;
