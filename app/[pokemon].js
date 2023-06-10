import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { usePathname } from 'expo-router';
import MainContainer from '../components/MainContainer';
import { useEffect, useState } from 'react';
import { Entypo } from '@expo/vector-icons';
import axios from 'axios';

const screenWidth = Dimensions.get('window').width;

function pokemonPage() {
  const name = usePathname().slice(1);
  const [pokemonData, setPokemonData] = useState(null);
  const [showShiny, setShowShiny] = useState(false);
  const URL = `https://pokeapi.co/api/v2/pokemon/${name}`;

  useEffect(() => {
    axios
      .get(URL)
      .then(response => {
        setPokemonData(response.data);
      })
      .catch(err => console.error(err));
  }, []);

  const ShinyToggler = () => {
    return (
      <TouchableOpacity
        style={styles.shinyButton}
        onPress={() => setShowShiny(prev => !prev)}
      >
        {showShiny ? (
          <Entypo name="star" size={30} color="yellow" />
        ) : (
          <Entypo name="star-outlined" size={30} color="yellow" />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <>
      <MainContainer>
        <View style={styles.container}>
          <Text>{name.toUpperCase()}</Text>
        </View>
        <View style={styles.baseInfos}>
          <View style={styles.imagesContainer}>
            <ShinyToggler />
            <Image
              src={
                showShiny
                  ? pokemonData?.sprites.other['official-artwork'].front_shiny
                  : pokemonData?.sprites.other['official-artwork'].front_default
              }
              style={styles.images}
            />
          </View>
          <View style={styles.infosContainer}></View>
        </View>
      </MainContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  baseInfos: {
    width: '100%',
    marginTop: 15,
  },
  imagesContainer: {
    borderWidth: 1,
    borderColor: '#d9d9d9',
    alignItems: 'center',
  },
  infosContainer: {},
  images: {
    height: screenWidth - 32,
    width: screenWidth - 32,
  },
  shinyButton: {
    position: 'absolute',
    top: -12,
    right: -12,
  },
});

export default pokemonPage;
