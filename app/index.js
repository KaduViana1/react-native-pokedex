import { Stack, useRouter } from 'expo-router';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Modal,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import PokemonCard from '../components/PokemonCard';
import { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import SideBar from '../components/SideBar';
import * as ImagePicker from 'expo-image-picker';
import Dropdown from '../components/Dropdown';
import { useSelector, useDispatch } from 'react-redux';
import { setImage } from '../features/profileImage/profileImageSlice';

function Home() {
  const [pokemonsList, setPokemonsList] = useState([]);
  const [currentPage, setCurrentPage] = useState(
    'https://pokeapi.co/api/v2/pokemon?limit=21'
  );
  const [isLoading, setIsLoading] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();
  const profImage = useSelector(state => state.profileImage.image);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchPokemons();
  }, []);

  const askGalleryPermissions = async () => {
    const galleryStatus =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (galleryStatus.status === 'granted') {
      pickImage();
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
      setShowDropdown(false);
    }
  };

  const loader = () => {
    return isLoading ? (
      <View>
        <ActivityIndicator size="large" color="red" />
      </View>
    ) : null;
  };

  const fetchPokemons = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(currentPage);
      setCurrentPage(response.data.next);
      setPokemonsList(prev => [...prev, ...response.data.results]);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <Modal
          visible={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          transparent
        >
          <SideBar />
        </Modal>
        <Stack.Screen
          options={{
            title: '',
            headerBackground: () => (
              <Image
                style={{ width: '100%', height: '100%' }}
                source={require('../assets/wallpaper2.jpg')}
              />
            ),
            headerLeft: () => (
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => setModalIsOpen(!modalIsOpen)}
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
                style={{}}
                onPress={() => {
                  // router.push('camera');
                  setShowDropdown(!showDropdown);
                }}
              >
                <Image
                  style={styles.headerButtons}
                  source={profImage || require('../assets/teste.jpg')}
                />
              </TouchableOpacity>
            ),
            headerShadowVisible: false,
          }}
        />

        <Dropdown
          askGalleryPermissions={askGalleryPermissions}
          showDropdown={showDropdown}
        />

        <LinearGradient colors={['rgb(72, 229, 212)', 'rgb(0, 153, 255)']}>
          <FlatList
            ListHeaderComponent={<Text>Pokedex</Text>}
            horizontal={false}
            data={pokemonsList}
            numColumns={3}
            keyExtractor={(item, index) => item.name + index}
            renderItem={({ item }) => <PokemonCard name={item.name} />}
            contentContainerStyle={styles.view}
            ListFooterComponent={loader}
            onEndReached={fetchPokemons}
          />
        </LinearGradient>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
  },
  view: { padding: 16, alignItems: 'center' },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  headerButtons: {
    width: 45,
    height: 45,
    borderRadius: 10,
  },
  dropDown: {
    position: 'absolute',
    right: 4,
    width: 150,
    height: 80,
    zIndex: 5,
    backgroundColor: '#2dc9e3',
    borderRadius: 10,
    elevation: 40,
  },
});

export default Home;
