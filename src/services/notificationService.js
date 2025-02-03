import PushNotification from 'react-native-push-notification'; // You also need this for Android push notifications

const key = 'reminders';
export const createChannel = () => {
  PushNotification.createChannel(
    {
      channelId: key, // (required for Android)
      channelName: 'Task reminder notifications', // (required for Android)
      channelDescription: 'Reminder for any tasks', // (optional) - Android only
      importance: 4, // High importance - to make sure the notification shows up
    },
    created => console.log(`CreateChannel returned ++'${created}'`), // (optional) callback to check if the channel was created
  );
};

export const getNotification = (title, body) => {
  console.log("title", title)
  console.log("body", body)
  PushNotification.localNotification({
    channelId: key, //this must be same with channelid in createchannel
    title: `${title}`,
    message: `${body}`,
  });
};