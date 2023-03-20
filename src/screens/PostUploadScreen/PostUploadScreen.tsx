import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {
  Camera,
  TakePhotoOptions,
  TakeSnapshotOptions,
  useCameraDevices,
} from 'react-native-vision-camera';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import colors from '../../theme/colors';

const PostUploadScreen = () => {
  const camera = useRef<Camera>(null);

  const [hasPermission, setHasPermisions] = useState<boolean | null>(null);
  const [cameraType, setCameraType] = useState<'front' | 'back'>('back');
  const [flash, setFlash] = useState<'off' | 'on'>('off');
  const [isRecording, setIsRecording] = useState(false);

  const devices = useCameraDevices();
  const device = devices[cameraType];

  const getPermissions = useCallback(async () => {
    const cameraPermission = await Camera.requestCameraPermission();
    const microphonePermission = await Camera.requestMicrophonePermission();
    setHasPermisions(
      cameraPermission === 'authorized' &&
        microphonePermission === 'authorized',
    );
  }, []);

  useEffect(() => {
    getPermissions();
  }, [getPermissions]);

  const onFlipCamera = useCallback(() => {
    setCameraType(currentCameraType =>
      currentCameraType === 'back' ? 'front' : 'back',
    );
  }, []);

  const onFlashPressed = useCallback(() => {
    setFlash(f => (f === 'off' ? 'on' : 'off'));
  }, []);

  const takePhotoOptions = useMemo<TakePhotoOptions & TakeSnapshotOptions>(
    () => ({
      photoCodec: 'jpeg',
      qualityPrioritization: 'speed',
      flash: flash,
      quality: 90,
      skipMetadata: true,
    }),
    [flash],
  );

  //#region Camera Capture
  const takePhoto = useCallback(async () => {
    try {
      if (camera.current == null) throw new Error('Camera ref is null!');
      if (!camera.current || isRecording) {
        return;
      }

      console.log('Taking photo...');
      const photo = await camera.current.takePhoto(takePhotoOptions);
      console.log(photo);
    } catch (e) {
      console.error('Failed to take photo!', e);
    }
  }, [camera, takePhotoOptions, isRecording]);

  const onStoppedRecording = useCallback(() => {
    setIsRecording(false);
    console.log('stopped recording video!');
  }, []);

  const stopRecording = useCallback(async () => {
    try {
      if (camera.current == null) throw new Error('Camera ref is null!');

      console.log('calling stopRecording()...');
      await camera.current.stopRecording();
      console.log('called stopRecording()!');
    } catch (e) {
      console.error('failed to stop recording!', e);
    }
  }, [camera]);

  const startRecording = useCallback(() => {
    try {
      if (camera.current == null) throw new Error('Camera ref is null!');

      console.log('calling startRecording()...');
      camera.current.startRecording({
        flash: flash,
        onRecordingError: error => {
          console.error('Recording failed!', error);
          onStoppedRecording();
        },
        onRecordingFinished: video => {
          console.log(`Recording successfully finished! ${video.path}`);
          console.log(video, 'video');
          onStoppedRecording();
        },
      });
      // TODO: wait until startRecording returns to actually find out if the recording has successfully started
      console.log('called startRecording()!');
      setIsRecording(true);
    } catch (e) {
      console.error('failed to start recording!', e, 'camera');
    }
  }, [camera, flash, onStoppedRecording]);

  if (hasPermission === null) {
    return <Text>Loading...</Text>;
  }

  if (hasPermission === false) {
    return <Text>No access to the camera</Text>;
  }

  if (device == null) return <Text>post</Text>;

  return (
    <View style={styles.page}>
      <Camera
        style={styles.camera}
        device={device}
        isActive={true}
        torch={flash}
        ref={camera}
        photo={true}
        video={true}
      />
      <View style={[styles.buttonsContainer, {top: 25}]}>
        <MaterialIcons name="close" size={30} color={colors.white} />
        <Pressable onPress={onFlashPressed}>
          <MaterialIcons
            name={flash === 'on' ? 'flash-on' : 'flash-off'}
            size={30}
            color={colors.white}
          />
        </Pressable>
        <MaterialIcons name="settings" size={30} color={colors.white} />
      </View>
      <View style={[styles.buttonsContainer, {bottom: 25}]}>
        <MaterialIcons name="photo-library" size={30} color={colors.white} />
        <Pressable
          onPress={takePhoto}
          onLongPress={startRecording}
          onPressOut={stopRecording}>
          <View
            style={[
              styles.circle,
              {backgroundColor: isRecording ? colors.accent : colors.white},
            ]}
          />
        </Pressable>
        <Pressable onPress={onFlipCamera}>
          <MaterialIcons
            name="flip-camera-ios"
            size={30}
            color={colors.white}
          />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.black,
  },
  camera: {
    width: '100%',
    aspectRatio: 1,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',

    position: 'absolute',
  },
  circle: {
    width: 75,
    aspectRatio: 1,
    borderRadius: 75,
    backgroundColor: colors.white,
  },
});

export default PostUploadScreen;
