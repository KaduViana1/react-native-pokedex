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
  const renderItem = ({ item }) => <PokemonCard name={item.name} />;
  const memoizedList = useMemo(() => renderItem, [pokemonsList]);

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
    if (isLoading) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.get(currentPage);
      setCurrentPage(response.data.next);
      setPokemonsList(prev => [...prev, ...response.data.results]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <MainContainer>
        <FlatList
          ListHeaderComponent={<Text style={styles.title}>Pokedéx</Text>}
          data={pokemonsList}
          numColumns={3}
          keyExtractor={(item, index) => item.name + index}
          renderItem={memoizedList}
          contentContainerStyle={styles.view}
          ListFooterComponent={loader}
          onEndReached={fetchPokemons}
          removeClippedSubviews={true}
          getItemLayout={(data, index) => ({
            length: 160,
            offset: 160 * index,
            index,
          })}
        />
      </MainContainer>
    </>
  );
}

const styles = StyleSheet.create({
  view: { alignItems: 'center' },
  title: { fontSize: 25, fontWeight: 600 },
});

export default Home;
