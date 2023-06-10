import { useEffect, useState, memo } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';
import { getTypeIcon } from '../utils/getTypeIcon';

function PokemonCard({ name }) {
  const URL = `https://pokeapi.co/api/v2/pokemon/${name}`;
  const [pokemonData, setPokemonData] = useState({});
  const router = useRouter();

  useEffect(() => {
    axios
      .get(URL)
      .then(response => {
        setPokemonData(response.data);
      })
      .catch(err => console.error(err));
  }, []);

  const goToPokemonPage = () => {
    router.push(`${name}`);
  };

  return (
    <TouchableOpacity onPress={goToPokemonPage} style={styles.card}>
      <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 10 }}>
        {name?.toUpperCase()}
      </Text>
      <Image style={styles.image} src={pokemonData?.sprites?.front_default} />
      <View style={styles.typesContainer}>
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
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 150,
    width: 100,
    margin: 10,
    borderWidth: 1,
    borderColor: '#d9d9d9',
    alignItems: 'center',
    padding: 5,
  },
  image: {
    width: '80%',
    height: 80,
    marginTop: 3,
  },
  typesContainer: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  typeIcon: {
    margin: 3,
    height: 22,
    width: 22,
  },
});

export default memo(PokemonCard);
