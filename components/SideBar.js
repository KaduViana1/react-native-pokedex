import { View, Text, StyleSheet } from 'react-native';

function SideBar() {
  return (
    <View style={styles.container}>
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
      <View style={styles.listItem}>
        <Text>Items</Text>
      </View>
    </View>
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
