import { LinearGradient } from 'expo-linear-gradient';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

function Dropdown({ showDropdown }) {
  const router = useRouter();

  return (
    <View
      style={[{ display: showDropdown ? 'flex' : 'none' }, styles.dropdown]}
    >
      <Pressable>
        <View style={[styles.button, styles.buttonTop]}>
          <Entypo name="folder" size={20} color={'white'} />
          <Text style={{ color: 'white', fontWeight: 'bold' }}>
            Browse device
          </Text>
        </View>
      </Pressable>
      <View style={styles.center}></View>
      <Pressable onPress={() => router.push('camera')}>
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
    right: 4,
    zIndex: 2,
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
