import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import { usePathname, useRouter } from 'expo-router';
import MainContainer from '../components/MainContainer';
import { useEffect, useState } from 'react';
import { AntDesign, Entypo, Octicons } from '@expo/vector-icons';
import axios from 'axios';
import { getTypeIcon } from '../utils/getTypeIcon';
import { capitalizeFirstLetter } from '../utils/capitalizeFirstLetter';
import PokemonCard from '../components/PokemonCard';
import InfosCard from '../components/InfosCard';
import InfosDropdown from '../components/InfosDropdown';
import InfosModal from '../components/InfosModal';
import { useDispatch, useSelector } from 'react-redux';
import {
  addFavorite,
  removeFavorite,
} from '../redux/features/favorites/favoritesSlice';

const screenWidth = Dimensions.get('window').width;
const screenWithPadding = screenWidth - 32;

function pokemonPage() {
  const name = usePathname().slice(1);
  const [pokemonData, setPokemonData] = useState(null);
  const [speciesData, setSpeciesData] = useState(null);
  const [evolutionChain, setEvolutionChain] = useState(null);
  const [showShiny, setShowShiny] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalInfos, setModalInfos] = useState({});
  const URL = `https://pokeapi.co/api/v2/pokemon/${name}`;
  const router = useRouter();
  const [noResults, setNoResults] = useState(false);
  const favorites = useSelector(state => state.favorites.favorites);
  const isFavoritee = favorites.includes(name);
  const dispatch = useDispatch();

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
      setPokemonData(null);
    }
  };

  const fetchModalInfos = (url, modalType) => {
    axios
      .get(url)
      .then(response => {
        if (modalType === 'move') {
          setModalInfos({
            name: response.data.name,
            effect: response.data.effect_entries[0].short_effect.replace(
              ' $effect_chance%',
              ''
            ),
            damageClass: response.data.damage_class.name,
            moveType: response.data.type.name,
          });
        } else {
          setModalInfos({
            name: response.data.name,
            effect: response.data.effect_entries[1].short_effect.replace(
              ' $effect_chance%',
              ''
            ),
          });
        }
      })
      .catch(err => console.error(err));
    setModalIsOpen(true);
  };

  const resetModal = () => {
    setModalIsOpen(false);
    setModalInfos({});
  };

  const ShinyToggler = () => {
    return (
      <TouchableOpacity
        style={styles.shinyButton}
        onPress={() => setShowShiny(!showShiny)}
      >
        {showShiny ? (
          <Entypo name="star" size={35} color="yellow" />
        ) : (
          <Entypo name="star-outlined" size={35} color="yellow" />
        )}
      </TouchableOpacity>
    );
  };

  const FavoriteToggler = () => {
    return (
      <>
        {isFavoritee ? (
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={() => dispatch(removeFavorite(name))}
          >
            <AntDesign name="heart" size={33} color="rgb(255, 0, 102)" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={() => dispatch(addFavorite(name))}
          >
            <AntDesign name="hearto" size={33} color="rgb(255, 0, 102)" />
          </TouchableOpacity>
        )}
      </>
    );
  };

  if (!pokemonData) {
    setTimeout(() => setNoResults(true), 1500);
    return (
      <MainContainer>
        {noResults && (
          <View style={styles.notFoundContainer}>
            <Image
              style={styles.notFoundImage}
              source={require('../assets/notfound.png')}
            />
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.notFoundButton}
            >
              <Text style={styles.notFoundText}>Go Back</Text>
            </TouchableOpacity>
          </View>
        )}
      </MainContainer>
    );
  }

  return (
    <>
      <MainContainer>
        <InfosModal
          modalInfos={modalInfos}
          closeModal={resetModal}
          modalIsOpen={modalIsOpen}
        />
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>{name.toUpperCase()}</Text>

          <View style={styles.imagesContainer}>
            <ShinyToggler />
            <FavoriteToggler />
            <Image
              src={
                showShiny
                  ? pokemonData?.sprites?.other['official-artwork'].front_shiny
                  : pokemonData?.sprites?.other['official-artwork']
                      .front_default
              }
              style={styles.images}
            />
          </View>
          <View style={styles.infosContainer}>
            <View style={{ flexDirection: 'row', gap: 5 }}>
              <InfosCard title={'Height'} width={screenWithPadding / 2 - 2.5}>
                <Text>{pokemonData?.height / 10} m</Text>
              </InfosCard>
              <InfosCard title={'Weight'} width={screenWithPadding / 2 - 2.5}>
                <Text>{pokemonData?.weight / 10} kg</Text>
              </InfosCard>
            </View>
            <View style={{ flexDirection: 'row', gap: 5 }}>
              <InfosCard title={'Habitat'} width={screenWithPadding / 2 - 2.5}>
                <Text>{speciesData?.habitat?.name} </Text>
              </InfosCard>
              <InfosCard
                title={'Leveling Rate'}
                width={screenWithPadding / 2 - 2.5}
              >
                <Text>{speciesData?.growth_rate?.name}</Text>
              </InfosCard>
            </View>
            <View style={{ flexDirection: 'row', gap: 5 }}>
              <InfosCard
                title={'Egg Groups'}
                width={screenWithPadding / 2 - 2.5}
              >
                {speciesData?.egg_groups?.length < 2 ? (
                  <Text>{speciesData?.egg_groups[0]?.name} </Text>
                ) : (
                  <Text>
                    {speciesData?.egg_groups[0]?.name} and{' '}
                    {speciesData?.egg_groups[1]?.name}
                  </Text>
                )}
              </InfosCard>
              <InfosCard
                title={'Hatch Time'}
                width={screenWithPadding / 2 - 2.5}
              >
                <Text>{speciesData?.hatch_counter} cycles </Text>
              </InfosCard>
            </View>
            <InfosCard title={'Type(s)'} flexDirection={'row'}>
              {pokemonData &&
                pokemonData?.types?.map(item => {
                  return (
                    <TouchableOpacity
                      onPress={() => router.push(`/type/${item.type.name}`)}
                      key={item.type.name + name}
                    >
                      <Image
                        style={styles.typeIcon}
                        source={getTypeIcon(item.type.name)}
                      />
                    </TouchableOpacity>
                  );
                })}
            </InfosCard>
            <InfosCard title={'Abilities'}>
              {pokemonData &&
                pokemonData?.abilities?.map(item => {
                  return (
                    <View
                      key={item.ability.name}
                      style={{
                        flexDirection: 'row',
                        gap: 10,
                        alignItems: 'center',
                      }}
                    >
                      <Text style={{ fontSize: 18 }}>
                        {capitalizeFirstLetter(item.ability.name)}
                      </Text>
                      <TouchableOpacity
                        onPress={() =>
                          fetchModalInfos(item.ability.url, 'ability')
                        }
                      >
                        <Octicons name="question" size={22} color="white" />
                      </TouchableOpacity>
                    </View>
                  );
                })}
            </InfosCard>
            <InfosDropdown title="Evolution Chain">
              <View>
                {evolutionChain && (
                  <View style={styles.rowContainer}>
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
                        <View
                          key={item?.species?.name}
                          style={styles.rowContainer}
                        >
                          <PokemonCard name={item?.species?.name} />
                        </View>
                      );
                    })
                  : null}
              </View>
            </InfosDropdown>

            {speciesData?.varieties?.length > 1 && (
              <InfosDropdown title="Varieties">
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
              </InfosDropdown>
            )}
            {pokemonData?.forms?.length > 1 && (
              <InfosDropdown title="Forms">
                {pokemonData?.forms?.map(item => {
                  if (item.name !== name) {
                    return <PokemonCard name={item.name} key={item.name} />;
                  }
                })}
              </InfosDropdown>
            )}
            {pokemonData?.moves?.length > 0 && (
              <InfosDropdown title={'Moves'}>
                {pokemonData?.moves?.map(item => (
                  <View key={item.move.name} style={styles.rowContainer}>
                    <Text style={{ fontSize: 18, marginVertical: 3 }}>
                      {capitalizeFirstLetter(item.move.name)}
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        fetchModalInfos(item.move.url, 'move');
                      }}
                      style={{ marginLeft: 10 }}
                    >
                      <Octicons name="question" size={22} color="white" />
                    </TouchableOpacity>
                  </View>
                ))}
              </InfosDropdown>
            )}
          </View>
        </ScrollView>
      </MainContainer>
    </>
  );
}

const styles = StyleSheet.create({
  notFoundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notFoundImage: { width: 280, height: 240, borderRadius: 20 },
  notFoundButton: {
    marginTop: 15,
    borderWidth: 2,
    borderColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 20,
  },
  notFoundText: { fontSize: 20, fontWeight: 600, color: 'white' },
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
  },
  images: {
    height: screenWithPadding,
    width: screenWithPadding,
  },
  shinyButton: {
    position: 'absolute',
    top: -23,
    right: 10,
    zIndex: 2,
  },
  favoriteButton: {
    position: 'absolute',
    top: -22,
    right: 50,
    zIndex: 2,
  },
  typeIcon: {
    margin: 3,
    height: 40,
    width: 40,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default pokemonPage;
