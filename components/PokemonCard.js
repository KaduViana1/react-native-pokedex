import { useEffect, useState, memo } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import axios from 'axios';

function PokemonCard({ name }) {
  const URL = `https://pokeapi.co/api/v2/pokemon/${name}`;
  const [pokemonData, setPokemonData] = useState({});

  const defineType = type => {
    switch (type) {
      case 'bug':
        return require(`../assets/types/bug.png`);
      case 'dark':
        return require(`../assets/types/dark.png`);
      case 'dragon':
        return require(`../assets/types/dragon.png`);
      case 'electric':
        return require(`../assets/types/electric.png`);
      case 'fairy':
        return require(`../assets/types/fairy.png`);
      case 'fighting':
        return require(`../assets/types/fighting.png`);
      case 'fire':
        return require(`../assets/types/fire.png`);
      case 'flying':
        return require(`../assets/types/flying.png`);
      case 'ghost':
        return require(`../assets/types/ghost.png`);
      case 'grass':
        return require(`../assets/types/grass.png`);
      case 'ground':
        return require(`../assets/types/ground.png`);
      case 'ice':
        return require(`../assets/types/ice.png`);
      case 'normal':
        return require(`../assets/types/normal.png`);
      case 'poison':
        return require(`../assets/types/poison.png`);
      case 'psychic':
        return require(`../assets/types/psychic.png`);
      case 'rock':
        return require(`../assets/types/rock.png`);
      case 'steel':
        return require(`../assets/types/steel.png`);
      case 'water':
        return require(`../assets/types/water.png`);
      default:
        return require(`../assets/types/normal.png`);
    }
  };

  useEffect(() => {
    axios
      .get(URL)
      .then(response => {
        setPokemonData(response.data);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <View style={styles.card}>
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
                source={defineType(item.type.name)}
              />
            );
          })}
      </View>
    </View>
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
    flexDirection: 'row',
    justifyContent: 'center',
  },
  typeIcon: {
    margin: 3,
    height: 16,
    width: 16,
  },
});

export default memo(PokemonCard);
