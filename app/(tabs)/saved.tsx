import * as Device from 'expo-device';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

import * as Notifications from 'expo-notifications';


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: false,
    shouldShowList: false,
  }),
});

const Saved = () => {
  const [selectedItem, setSelectedItem] = useState();
  const [permissionGranted, setPermissionGranted] = useState(false);

  useEffect(() => {
    const requestPermission = async () => {
      if (Device.isDevice) {
        const {status: existingStatus} = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if(existingStatus !== 'granted') {
          const {status} = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }

        setPermissionGranted(finalStatus === 'granted');
      } else {
        console.log('Must use a physical device');
      }
    }

    requestPermission();
    
    // Cancel all scheduled notifications to stop the repeating one
    Notifications.cancelAllScheduledNotificationsAsync();
  }, [])
  
  const sendNotification = async () => {
    if(!permissionGranted) {
      alert('Permission not granted');
      return;
    }

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "whats up !",
        body: "This is a test notification",
        sound: 'default',
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: 5,
        repeats: true,
      }
    })
  }
  
  return (
    <View>
      <Text>saved</Text>
      <Text>{Device.manufacturer}: {Device.totalMemory}</Text>
    </View>
  )
}

export default Saved