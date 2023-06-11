import { Modal, View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { capitalizeFirstLetter } from '../utils/capitalizeFirstLetter';
import { getTypeIcon } from '../utils/getTypeIcon';
import { AntDesign } from '@expo/vector-icons';

function InfosModal({ modalIsOpen, closeModal, modalInfos }) {
  const { name, damageClass, moveType, effect } = modalInfos;

  return (
    <Modal visible={modalIsOpen} onRequestClose={closeModal} transparent>
      <View style={styles.container}>
        <View style={styles.modal}>
          <Pressable
            hitSlop={30}
            onPress={closeModal}
            style={styles.closeButton}
          >
            <AntDesign name="close" size={24} color="black" />
          </Pressable>
          <View style={styles.header}>
            <Text style={styles.name}>{name?.toUpperCase()}</Text>
          </View>
          {damageClass && moveType && (
            <View style={styles.moveContainer}>
              <Text style={styles.classAndType}>
                Type:{' '}
                <Image
                  style={{ width: 20, height: 20 }}
                  source={getTypeIcon(moveType)}
                />
              </Text>
              <Text style={styles.classAndType}>
                Class: {capitalizeFirstLetter(damageClass)}
              </Text>
            </View>
          )}
          <View style={styles.body}>
            <Text style={styles.effect}>{effect}</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    backgroundColor: 'rgb(51, 204, 255)',
    width: '75%',
    borderRadius: 20,
    padding: 15,
    gap: 10,
  },
  header: { alignItems: 'center' },
  name: { fontSize: 20, fontWeight: '500' },
  moveContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  classAndType: {
    fontSize: 18,
  },
  effect: {
    fontSize: 16,
  },
  closeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 3,
  },
});

export default InfosModal;
