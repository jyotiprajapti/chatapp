/**
 * @format
 */

import {AppRegistry} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import App from './App';
import {name as appName} from './app.json';
import { getNotification } from './src/services/notificationService';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log("remoteMessage",remoteMessage)
    getNotification(
      remoteMessage.notification.title,
      remoteMessage.notification.body,
    );
  });
AppRegistry.registerComponent(appName, () => App);
