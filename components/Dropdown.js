import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import { setImage } from '../redux/features/profileImage/profileImageSlice';
import { toggleDropdown } from '../redux/features/profileImage/profileImageDropdownSlice';

function Dropdown() {
  const router = useRouter();
  const dispatch = useDispatch();
  const dropDown = useSelector(state => state.profileImageDropdown.open);

  const askGalleryPermissions = async () => {
    const galleryStatus =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (galleryStatus.status === 'granted') {
      pickImage();
    } else {
      Alert.alert('Media access must be granted');
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      dispatch(setImage(result.assets[0].uri));
    }
    dispatch(toggleDropdown());
  };

  const goToCamera = () => {
    router.push('camera');
    dispatch(toggleDropdown());
  };

  return (
    <View style={[{ display: dropDown ? 'flex' : 'none' }, styles.dropdown]}>
      <Pressable onPress={askGalleryPermissions}>
        <View style={[styles.button, styles.buttonTop]}>
          <Entypo name="folder" size={20} color={'white'} />
          <Text style={{ color: 'white', fontWeight: 'bold' }}>
            Browse device
          </Text>
        </View>
      </Pressable>
      <View style={styles.center}></View>
      <Pressable onPress={goToCamera}>
        <View style={[styles.button, styles.buttonBottom]}>
          <Entypo name="camera" size={20} color={'black'} />
          <Text style={{ color: 'black', fontWeight: 'bold' }}>
            Take picture
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  dropdown: {
    position: 'absolute',
    right: 10,
    zIndex: 10,
    width: 150,
    height: 100,
    borderRadius: 20,
    elevation: 200,
    backgroundColor: 'white',
  },
  button: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
    gap: 8,
  },
  buttonTop: {
    backgroundColor: 'red',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomWidth: 2,
    borderBottomColor: 'black',
  },
  buttonBottom: {
    backgroundColor: 'white',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopWidth: 2,
    borderTopColor: 'black',
  },
  center: {
    position: 'absolute',
    width: 17,
    height: 17,
    borderRadius: 7.5,
    backgroundColor: 'white',
    top: 43.5,
    left: 66.5,
    borderColor: 'black',
    borderWidth: 3,
    zIndex: 3,
  },
});

export default Dropdown;
