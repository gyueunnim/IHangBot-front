import { Audio } from 'expo-av';

export async function startRecording() {
  try {
    // console.log('Requesting permissions..');
    await Audio.requestPermissionsAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
    });

    // console.log('Starting recording..');
    const recordOption = Audio.RecordingOptionsPresets.HIGH_QUALITY;
    recordOption.android.extension = ".wav";
    const { recording } = await Audio.Recording.createAsync(recordOption);
    // console.log('Recording started');
    return recording;
  } catch (err) {
    console.error('Failed to start recording', err);
  }
}

export async function stopRecording(recording) {
  // console.log('Stopping recording..');
  await recording.stopAndUnloadAsync();
  await Audio.setAudioModeAsync(
    {
      allowsRecordingIOS: false,
    }
  );
  const uri = recording.getURI();
  // console.log('(audio)-Recording stopped and stored at', uri);
  return uri;
}

export async function playSound(uri) {
  console.log('Loading Sound', uri);
  const { sound } = await Audio.Sound.createAsync({ uri });
  console.log('Playing Sound');
  await sound.playAsync();
  return sound;
}