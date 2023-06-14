import { View, Text, StyleSheet, FlatList } from 'react-native';
import PokemonCard from '../../components/PokemonCard';
import { useEffect, useState, useMemo } from 'react';
import MainContainer from '../../components/MainContainer';
import { useSelector } from 'react-redux';

function Favorites() {
  const favorites = useSelector(state => state.favorites.favorites);

  return (
    <>
      <MainContainer>
        <FlatList
          ListHeaderComponent={<Text style={styles.title}>Favorites</Text>}
          data={favorites}
          numColumns={3}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => <PokemonCard name={item} />}
          contentContainerStyle={styles.view}
        />
      </MainContainer>
    </>
  );
}

const styles = StyleSheet.create({
  view: { alignItems: 'center' },
  title: { fontSize: 25, fontWeight: 600 },
});

export default Favorites;
