import { Stack } from 'expo-router';
import { Image, StatusBar } from 'react-native';

function Layout() {
  return (
    <>
      <StatusBar barStyle={'light-content'} backgroundColor={'black'} />
      <Stack
        screenOptions={{
          headerBackground: () => (
            <Image
              style={{ width: '100%', height: '100%' }}
              source={require('../assets/wallpaper2.jpg')}
            />
          ),
        }}
      />
    </>
  );
}

export default Layout;
