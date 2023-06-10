import { Stack } from 'expo-router';
import { Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { toggleDropdown } from '../redux/features/profileImage/profileImageDropdownSlice';
import { toggleModal } from '../redux/features/sideBar/sideBarModalSlice';

function Header() {
  const profileImage = useSelector(state => state.profileImage.image);
  const dispatch = useDispatch();

  return (
    <Stack.Screen
      options={{
        title: '',
        headerBackground: () => (
          <Image
            style={styles.headerImage}
            source={require('../assets/wallpaper2.jpg')}
          />
        ),
        headerLeft: () => (
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => dispatch(toggleModal())}
          >
            <Image
              style={styles.headerButtons}
              source={require('../assets/pokeball.png')}
            />
          </TouchableOpacity>
        ),
        headerRight: () => (
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              dispatch(toggleDropdown());
            }}
          >
            <Image
              style={styles.headerButtons}
              source={profileImage || require('../assets/teste.jpg')}
            />
          </TouchableOpacity>
        ),
        headerShadowVisible: false,
      }}
    />
  );
}

const styles = StyleSheet.create({
  headerImage: {
    width: '100%',
    height: '100%',
  },
  headerButtons: {
    width: 45,
    height: 45,
    borderRadius: 10,
  },
});

export default Header;
