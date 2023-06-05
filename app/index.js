import { Link, Stack } from 'expo-router';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import PokemonCard from '../components/PokemonCard';
import { useEffect, useState } from 'react';
import axios from 'axios';

const simulator = [
  { name: 'charmander' },
  { name: 'charmeleon' },
  { name: 'charizard' },
];

function Home() {
  const [pokemonsList, setPokemonsList] = useState([]);
  const [currentPage, setCurrentPage] = useState(
    'https://pokeapi.co/api/v2/pokemon?limit=21'
  );

  useEffect(() => {
    axios.get(currentPage).then(response => {
      setPokemonsList(response.data.results);
      setCurrentPage(response.data.next);
    });
  }, []);

  const loader = () => {
    return (
      <View>
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  };

  const fetchMorePokemons = async url => {
    const response = await axios.get(url);
    setPokemonsList(prev => [...prev, ...response.data.results]);
    setCurrentPage(response.data.next);
  };

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <Stack.Screen
          options={{
            title: '',
            headerLeft: () => (
              <TouchableOpacity>
                <Image
                  style={styles.headerButtons}
                  source={require('../assets/pokeball.png')}
                />
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity>
                <Image
                  style={styles.headerButtons}
                  source={require('../assets/teste.jpg')}
                />
              </TouchableOpacity>
            ),
            headerShadowVisible: false,
          }}
        />
        <LinearGradient colors={['rgb(72, 229, 212)', 'rgb(0, 153, 255)']}>
          <View>
            <FlatList
              ListHeaderComponent={<Text>Pokedex</Text>}
              horizontal={false}
              data={pokemonsList}
              numColumns={3}
              keyExtractor={(item, index) => item.name + index}
              renderItem={({ item }) => <PokemonCard name={item.name} />}
              contentContainerStyle={styles.view}
              ListFooterComponent={loader}
              onEndReached={() => fetchMorePokemons(currentPage)}
            />
          </View>
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
  text: {},
  view: { padding: 16, alignItems: 'center' },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  headerButtons: {
    width: 40,
    height: 40,
    borderRadius: 10,
  },
});

export default Home;
