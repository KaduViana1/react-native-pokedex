import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import PokemonCard from '../components/PokemonCard';
import { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import MainContainer from '../components/MainContainer';

function Home() {
  const [pokemonsList, setPokemonsList] = useState([]);
  const [currentPage, setCurrentPage] = useState(
    'https://pokeapi.co/api/v2/pokemon?limit=21'
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchPokemons();
  }, []);

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
      <MainContainer>
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
      </MainContainer>
    </>
  );
}

const styles = StyleSheet.create({
  view: { padding: 16, alignItems: 'center' },
});

export default Home;
