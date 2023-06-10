import { SafeAreaView, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Header from './Header';
import SideBar from './SideBar';
import Dropdown from './Dropdown';

function MainContainer({ children }) {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <SideBar />
      <Dropdown />
      <LinearGradient
        style={styles.main}
        colors={['rgb(72, 229, 212)', 'rgb(0, 153, 255)']}
      >
        {children}
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    flex: 1,
    padding: 16,
  },
});

export default MainContainer;
