import { Stack } from 'expo-router';
import { Image, StatusBar } from 'react-native';

function Layout() {
  return (
    <>
      <StatusBar barStyle={'light-content'} backgroundColor={'black'} />
      <Stack />
    </>
  );
}

export default Layout;
