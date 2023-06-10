import { Stack, useRouter } from 'expo-router';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Alert,
  StatusBar,
  Image,
} from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { useState, useEffect, useRef } from 'react';
import CameraButton from '../components/CameraButton';
import { useDispatch } from 'react-redux';
import { setImage as dispatchImage } from '../redux/features/profileImage/profileImageSlice';

function CameraScreen() {
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.front);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const cameraRef = useRef(null);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    askPermissions();
  }, []);

  const askPermissions = async () => {
    const cameraStatus = await Camera.requestCameraPermissionsAsync();
    const mediaStatus = await MediaLibrary.requestPermissionsAsync();

    if (cameraStatus.status !== 'granted') {
      Alert.alert('Warning', 'Camera permissions must be granted', [
        { text: 'Go Back', onPress: () => router.back() },
      ]);
    }
    if (mediaStatus.status !== 'granted') {
      Alert.alert('Warning', 'Media access permissions must be granted', [
        { text: 'Go Back', onPress: () => router.back() },
      ]);
    }
  };

  const takePicture = async () => {
    if (cameraRef) {
      try {
        const picture = await cameraRef.current.takePictureAsync();
        setImage(picture.uri);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const saveImage = async () => {
    if (image) {
      try {
        // await MediaLibrary.createAssetAsync(image);
        dispatch(dispatchImage(image));
        setImage(null);
        router.back();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const changeCamera = () => {
    type === Camera.Constants.Type.front
      ? setType(Camera.Constants.Type.back)
      : setType(Camera.Constants.Type.front);
  };

  const toggleFlash = () => {
    flash === Camera.Constants.FlashMode.off
      ? setFlash(Camera.Constants.FlashMode.on)
      : setFlash(Camera.Constants.FlashMode.off);
  };

  return (
    <>
      <StatusBar hidden={true} />
      <SafeAreaView style={styles.container}>
        <Stack.Screen
          visible={false}
          options={{
            title: '',
            headerBackVisible: false,
            headerShown: false,
          }}
        />
        {!image ? (
          <Camera
            style={styles.camera}
            type={type}
            flashMode={flash}
            ref={cameraRef}
            ratio="4:3"
          />
        ) : (
          <Image source={{ uri: image }} style={styles.camera} />
        )}
        <View style={styles.buttonsContainer}>
          {!image ? (
            <>
              <CameraButton
                onPress={toggleFlash}
                color={
                  flash === Camera.Constants.FlashMode.on ? 'yellow' : null
                }
                icon={'flash'}
              />
              <CameraButton onPress={takePicture} icon={'camera'} />
              <CameraButton onPress={changeCamera} icon={'retweet'} />
            </>
          ) : (
            <>
              <CameraButton
                onPress={() => {
                  setImage(null);
                }}
                icon={'cross'}
              />

              <CameraButton onPress={saveImage} icon={'check'} />
            </>
          )}
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: '20%',
    backgroundColor: 'black',
  },
  camera: {
    height: '70%',
  },
  buttonsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    height: '15%',
  },
  buttons: {
    height: 70,
    width: 70,
    backgroundColor: 'black',
    borderRadius: 70 / 2,
    borderWidth: 2,
    borderColor: 'grey',
  },
  takePicture: {},
});

export default CameraScreen;
