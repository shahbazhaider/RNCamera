import RNFS from 'react-native-fs';
import React, {useEffect, useRef, useState} from 'react';
import {RNCamera} from 'react-native-camera';
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import useAndroidPermissions from '@/hooks/useAndroidPermissions';
import {cameraActions} from '@/utils/helper';

export const folder = RNFS.ExternalDirectoryPath + '/RNCamera';

const CameraScreen = ({navigation}: {navigation: any}) => {
  const isDarkMode = useColorScheme() === 'dark';
  let cameraRef = useRef<RNCamera>(null);
  const [cameraType, setCameraType] = useState(RNCamera.Constants.Type.back);
  const [flash, setFlash] = useState(RNCamera.Constants.FlashMode.off);

  //Hooks to for Read and Write Permissions in Android
  const {checkPermissions} = useAndroidPermissions();

  useEffect(() => {
    checkPermissions();
  }, []);

  const takePicture = async () => {
    if (cameraRef) {
      const data = await cameraRef?.current?.takePictureAsync({
        quality: 0.5,
      });

      if (data) {
        await RNFS.moveFile(
          data.uri,
          folder + '/' + Date.now() + '.' + data.uri.split('.').pop(),
        );
        navigation.navigate('ResultScreen');
      }
    }
  };

  const flipCamera = () => {
    if (cameraType === RNCamera.Constants.Type.back) {
      setCameraType(RNCamera.Constants.Type.front);
    } else {
      setCameraType(RNCamera.Constants.Type.back);
    }
  };

  const toggleFlash = () => {
    if (flash === RNCamera.Constants.FlashMode.off) {
      setFlash(RNCamera.Constants.FlashMode.on);
    } else {
      setFlash(RNCamera.Constants.FlashMode.off);
    }
  };

  const onPressCameraAction = (name: string) => {
    if (name === cameraActions.FLASH) {
      toggleFlash();
    }
    if (name === cameraActions.SNAP) {
      takePicture();
    }
    if (name === cameraActions.TYPE) {
      flipCamera();
    }
  };

  const renderCameraActions = (name: string) => {
    return (
      <TouchableOpacity onPress={()=> onPressCameraAction(name)} style={styles.capture}>
        <Text style={{fontSize: 14}}>{name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={styles.container}>
        <RNCamera
          ref={cameraRef}
          style={styles.preview}
          type={cameraType}
          flashMode={flash}
          captureAudio={false}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}>
          <View style={styles.cameraActionsContainer}>
            {renderCameraActions(cameraActions.FLASH)}
            {renderCameraActions(cameraActions.SNAP)}
            {renderCameraActions(cameraActions.TYPE)}
          </View>
        </RNCamera>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  cameraActionsContainer: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default CameraScreen;
