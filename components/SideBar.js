import { View, Text, StyleSheet, Modal, TextInput } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { toggleModal } from '../redux/features/sideBar/sideBarModalSlice';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { Entypo } from '@expo/vector-icons';

function SideBar() {
  const [search, onChangeSearch] = useState('');
  const modalIsOpen = useSelector(state => state.sideBarModal.open);
  const dispatch = useDispatch();
  const router = useRouter();

  const searchPokemon = () => {
    const lowerSearch = search.toLowerCase();
    dispatch(toggleModal());
    router.push(`${lowerSearch}`);
  };

  return (
    <Modal
      visible={modalIsOpen}
      onRequestClose={() => dispatch(toggleModal())}
      transparent
    >
      <View
        style={styles.container}
        colors={['rgb(72, 229, 212)', 'rgb(0, 153, 255)']}
      >
        <View style={styles.searchInput}>
          <TextInput
            autoCorrect={false}
            value={search}
            onChangeText={onChangeSearch}
            placeholder="Search pokemon"
          />
          <Entypo
            onPress={searchPokemon}
            name="magnifying-glass"
            size={24}
            color="black"
          />
        </View>
        <View style={styles.listItem}>
          <Text>Items</Text>
        </View>
        <View style={styles.listItem}>
          <Text>Items</Text>
        </View>
        <View style={styles.listItem}>
          <Text>Items</Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '55%',
    backgroundColor: 'rgb(51, 204, 255)',
    paddingVertical: 100,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 3,
  },
  searchInput: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'white',
    marginHorizontal: 10,
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
});

export default SideBar;
