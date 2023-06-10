import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import { usePathname } from 'expo-router';
import MainContainer from '../components/MainContainer';
import { useEffect, useState } from 'react';
import { Entypo } from '@expo/vector-icons';
import axios from 'axios';
import { getTypeIcon } from '../utils/getTypeIcon';
import PokemonCard from '../components/PokemonCard';

const screenWidth = Dimensions.get('window').width;
const screenWithPadding = screenWidth - 32;

function pokemonPage() {
  const name = usePathname().slice(1);
  const [pokemonData, setPokemonData] = useState(null);
  const [speciesData, setSpeciesData] = useState(null);
  const [evolutionChain, setEvolutionChain] = useState(null);
  const [showShiny, setShowShiny] = useState(false);
  const URL = `https://pokeapi.co/api/v2/pokemon/${name}`;
  // const URL = `https://pokeapi.co/api/v2/pokemon/eevee`;

  useEffect(() => {
    fetchPokemonData();
  }, []);

  const fetchPokemonData = async () => {
    try {
      const response = await axios.get(URL);
      setPokemonData(response.data);
      const speciesResponse = await axios.get(response.data.species.url);
      setSpeciesData(speciesResponse.data);
      const evolutionChainResponse = await axios.get(
        speciesResponse.data.evolution_chain.url
      );
      setEvolutionChain(evolutionChainResponse.data.chain);
    } catch (err) {
      console.error(err);
    }
  };

  const capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const ShinyToggler = () => {
    return (
      <TouchableOpacity
        style={styles.shinyButton}
        onPress={() => setShowShiny(prev => !prev)}
      >
        {showShiny ? (
          <Entypo name="star" size={40} color="yellow" />
        ) : (
          <Entypo name="star-outlined" size={40} color="yellow" />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <>
      <MainContainer>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>{name.toUpperCase()}</Text>

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
          <View style={styles.infosContainer}>
            <View style={{ flexDirection: 'row', gap: 5 }}>
              <View
                style={[
                  styles.infoContainer,
                  { width: screenWithPadding / 2 - 2.5 },
                ]}
              >
                <View style={styles.infoContainerHeader}>
                  <Text style={styles.infoTitle}>Height</Text>
                </View>
                <View style={styles.infoContainerBody}>
                  <Text>{pokemonData?.height / 10} m</Text>
                </View>
              </View>
              <View
                style={[
                  styles.infoContainer,
                  { width: screenWithPadding / 2 - 2.5 },
                ]}
              >
                <View style={styles.infoContainerHeader}>
                  <Text style={styles.infoTitle}>Weight</Text>
                </View>
                <View style={styles.infoContainerBody}>
                  <Text>{pokemonData?.weight / 10} kg</Text>
                </View>
              </View>
            </View>
            <View style={styles.infoContainer}>
              <View style={styles.infoContainerHeader}>
                <Text style={styles.infoTitle}>Type(s)</Text>
              </View>
              <View
                style={[styles.infoContainerBody, { flexDirection: 'row' }]}
              >
                {pokemonData &&
                  pokemonData?.types?.map(item => {
                    return (
                      <Image
                        key={item.type.name + name}
                        style={styles.typeIcon}
                        source={getTypeIcon(item.type.name)}
                      />
                    );
                  })}
              </View>
            </View>
            <View style={styles.infoContainer}>
              <View style={styles.infoContainerHeader}>
                <Text style={styles.infoTitle}>Abilities</Text>
              </View>
              <View>
                {pokemonData &&
                  pokemonData?.abilities?.map(item => {
                    return (
                      <Text style={{ fontSize: 18 }} key={item.ability.name}>
                        {capitalizeFirstLetter(item.ability.name)}
                      </Text>
                    );
                  })}
              </View>
            </View>
            <View style={styles.infoContainer}>
              <View style={styles.infoContainerHeader}>
                <Text style={styles.infoTitle}>Evolution Chain</Text>
              </View>
              <View>
                {evolutionChain && (
                  <View style={styles.evolutionsContainer}>
                    <PokemonCard name={evolutionChain?.species?.name} />
                    {evolutionChain?.evolves_to[0]?.species &&
                    evolutionChain?.evolves_to.length <= 1 ? (
                      <PokemonCard
                        name={evolutionChain?.evolves_to[0]?.species?.name}
                      />
                    ) : null}
                    {evolutionChain?.evolves_to[0]?.evolves_to[0]?.species &&
                    evolutionChain?.evolves_to.length <= 1 ? (
                      <PokemonCard
                        name={
                          evolutionChain?.evolves_to[0]?.evolves_to[0]?.species
                            ?.name
                        }
                      />
                    ) : null}
                  </View>
                )}
                {evolutionChain && evolutionChain.evolves_to.length > 1
                  ? evolutionChain?.evolves_to?.map(item => {
                      return (
                        <View style={styles.evolutionsContainer}>
                          <PokemonCard
                            key={item?.species?.name}
                            name={item?.species?.name}
                          />
                        </View>
                      );
                    })
                  : null}
              </View>
            </View>
            {speciesData?.varieties?.length > 1 && (
              <View style={styles.infoContainer}>
                <View style={styles.infoContainerHeader}>
                  <Text style={styles.infoTitle}>Varieties</Text>
                </View>
                <View>
                  {speciesData?.varieties?.map(item => {
                    if (item.pokemon.name !== name) {
                      return (
                        <PokemonCard
                          name={item.pokemon.name}
                          key={item.pokemon.name}
                        />
                      );
                    }
                  })}
                </View>
              </View>
            )}
            {pokemonData?.forms?.length > 1 && (
              <View style={styles.infoContainer}>
                <View style={styles.infoContainerHeader}>
                  <Text style={styles.infoTitle}>Forms</Text>
                </View>
                <View>
                  {pokemonData?.forms?.map(item => {
                    if (item.name !== name) {
                      return <PokemonCard name={item.name} key={item.name} />;
                    }
                  })}
                </View>
              </View>
            )}
          </View>
        </ScrollView>
      </MainContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  title: {
    fontSize: 25,
    color: 'black',
    fontWeight: 700,
  },
  imagesContainer: {
    width: '100%',
    marginTop: 15,
    alignItems: 'center',
    marginBottom: 10,
  },
  infosContainer: {
    width: '100%',
    gap: 10,
  },
  images: {
    height: screenWithPadding,
    width: screenWithPadding,
  },
  shinyButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 2,
  },
  infoContainer: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d9d9d9',
  },
  infoContainerHeader: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: '#d9d9d9',
    backgroundColor: 'rgba(255, 255, 255, .6)',
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: 500,
  },
  infoContainerBody: {
    padding: 5,
  },
  typeIcon: {
    margin: 3,
    height: 40,
    width: 40,
  },
  evolutionsContainer: {
    flexDirection: 'row',
  },
});

export default pokemonPage;
