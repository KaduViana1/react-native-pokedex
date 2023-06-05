import { Link, Stack, useRouter } from 'expo-router';
import { View, Text, SafeAreaView, StyleSheet, StatusBar } from 'react-native';

function Teste() {
  const router = useRouter();

  return (
    <>
      <StatusBar barStyle={'light-content'} />
      <SafeAreaView style={styles.container}>
        <Text style={styles.text}>Testando</Text>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  text: {
    color: 'green',
  },
});

export default Teste;
