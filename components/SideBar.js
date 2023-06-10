import { View, Text, StyleSheet, Modal } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { toggleModal } from '../redux/features/sideBar/sideBarModalSlice';
import { LinearGradient } from 'expo-linear-gradient';

function SideBar() {
  const modalIsOpen = useSelector(state => state.sideBarModal.open);
  const dispatch = useDispatch();

  return (
    <Modal
      visible={modalIsOpen}
      onRequestClose={() => dispatch(toggleModal())}
      transparent
    >
      <LinearGradient
        style={styles.container}
        colors={['rgb(72, 229, 212)', 'rgb(0, 153, 255)']}
      >
        <View style={styles.listItem}>
          <Text>Items</Text>
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
      </LinearGradient>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '50%',
    backgroundColor: 'white',
    padding: 10,
  },
  listItem: {},
});

export default SideBar;
