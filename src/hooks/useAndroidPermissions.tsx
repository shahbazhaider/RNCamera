import React from 'react';
import {Alert, BackHandler, PermissionsAndroid, Platform} from 'react-native';

const useAndroidPermissions = () => {
  const isAndroid = Platform.OS === 'android';

  const checkPermissions = async () => {
    if (isAndroid) {
      const read = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      );
      const write = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );

      if (!read || !write) {
        const readGranted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: 'RNCamera Read Permission',
            message:
              'RNCamera needs access to your external storage so it can read from the gallery',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        const writeGranted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'RNCamera Write Permission',
            message:
              'RNCamera needs access to your external storage so it can write to the gallery',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );

        if (readGranted !== 'granted' || writeGranted !== 'granted') {
          return Alert.alert(
            'Insufficient Permission',
            'Please grant required permissions',
            [
              {
                onPress: () => BackHandler.exitApp(),
                text: 'Exit App',
                style: 'destructive',
              },
            ],
          );
        }
      }
    }
  };

  return {
    checkPermissions,
  };
};

export default useAndroidPermissions;
