import {
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  TouchableOpacity,
  Pressable,
  Image,
  FlatList,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { toggleModal } from '../redux/features/sideBar/sideBarModalSlice';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { Entypo, AntDesign } from '@expo/vector-icons';
import { getTypeIcon } from '../utils/getTypeIcon';
import PokemonCard from './PokemonCard';

function Menu() {
  const [search, onChangeSearch] = useState('');
  const [displayTypes, setDisplayTypes] = useState(false);
  const modalIsOpen = useSelector(state => state.sideBarModal.open);
  const favorites = useSelector(state => state.favorites.favorites);
  const dispatch = useDispatch();
  const router = useRouter();
  const pokemonTypes = [
    'bug',
    'dark',
    'dragon',
    'electric',
    'fairy',
    'fighting',
    'fire',
    'flying',
    'ghost',
    'grass',
    'ground',
    'ice',
    'normal',
    'poison',
    'psychic',
    'rock',
    'steel',
    'water',
  ];

  const searchPokemon = () => {
    const lowerSearch = search.toLowerCase();
    closeMenu();
    router.push(`${lowerSearch}`);
  };

  const pressHomeButton = () => {
    closeMenu();
    router.push('/');
  };

  const selectType = type => {
    closeMenu();
    router.push(`/type/${type}`);
  };

  const closeMenu = () => {
    setDisplayTypes(false);
    dispatch(toggleModal());
  };

  const goToFavorites = () => {
    closeMenu();
    router.push('/favorites');
  };

  return (
    <Modal visible={modalIsOpen} onRequestClose={closeMenu} transparent>
      <View style={styles.container}>
        <View style={styles.sideBar}>
          <TouchableOpacity style={styles.closeButton} onPressIn={closeMenu}>
            <AntDesign name="close" size={24} color="black" />
          </TouchableOpacity>
          <View style={styles.searchInput}>
            <TextInput
              autoCorrect={false}
              value={search}
              onChangeText={onChangeSearch}
              placeholder="Search pokemon"
              style={{ color: 'white' }}
              placeholderTextColor={'white'}
              onSubmitEditing={searchPokemon}
            />
            <Entypo
              onPress={searchPokemon}
              name="magnifying-glass"
              size={24}
              color="white"
            />
          </View>
          <Pressable onPress={pressHomeButton} style={styles.listItem}>
            <Entypo name="home" size={24} color="white" />
            <Text style={styles.buttonText}>Go to home</Text>
          </Pressable>
          <Pressable
            onPress={() => setDisplayTypes(!displayTypes)}
            style={styles.listItem}
          >
            <View style={styles.typesIconContainer}>
              <Image
                style={[styles.typesIcon, { right: 3.5 }]}
                source={getTypeIcon('water')}
              />
              <Image
                style={[styles.typesIcon, { left: 3.5, bottom: 0 }]}
                source={getTypeIcon('bug')}
              />
              <Image
                style={[styles.typesIcon, { right: 3.5, bottom: 0 }]}
                source={getTypeIcon('flying')}
              />
              <Image
                style={[styles.typesIcon, { left: 3 }]}
                source={getTypeIcon('fire')}
              />
              <Image
                style={[styles.typesIcon, { top: 8 }]}
                source={getTypeIcon('rock')}
              />
              <Image
                style={[styles.typesIcon, { top: 8, left: 8.2 }]}
                source={getTypeIcon('dragon')}
              />
              <Image
                style={[styles.typesIcon, { top: 8, right: 0 }]}
                source={getTypeIcon('grass')}
              />
            </View>
            <Text style={styles.buttonText}>Types</Text>
          </Pressable>
          <Pressable onPress={goToFavorites} style={styles.listItem}>
            <AntDesign name="heart" size={24} color="rgb(255, 0, 102)" />
            <Text style={styles.buttonText}>Favorites</Text>
          </Pressable>
        </View>
        <View
          style={[
            styles.typesList,
            { display: displayTypes ? 'flex' : 'none' },
          ]}
        >
          {pokemonTypes.map(type => (
            <TouchableOpacity onPress={() => selectType(type)} key={type}>
              <Image style={styles.typeButton} source={getTypeIcon(type)} />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0, .3)',
    flexDirection: 'row',
    alignItems: 'center',
  },
  sideBar: {
    height: '100%',
    width: '50%',
    backgroundColor: 'rgb(0, 172, 230)',
    paddingVertical: 100,
    gap: 20,
    alignItems: 'center',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    borderWidth: 1,
    borderColor: 'white',
    padding: 5,
    gap: 10,
    borderRadius: 10,
  },
  searchInput: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'white',
    marginHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 5,
    width: '90%',
  },
  closeButton: {
    position: 'absolute',
    right: 5,
    top: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 18,
  },
  typesIconContainer: {
    width: 24,
    height: 24,
  },
  typesIcon: {
    width: 7.5,
    height: 7.5,
    position: 'absolute',
  },
  typesList: {
    width: 160,
    alignItems: 'center',
    backgroundColor: 'rgb(0, 172, 230)',
    marginLeft: 10,
    borderRadius: 15,
    padding: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  typeButton: {
    width: 35,
    height: 35,
    margin: 5,
  },
});

export default Menu;
