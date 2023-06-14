import { Stack } from 'expo-router';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import store, { persistor } from '../redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import Menu from '../components/Menu';

function Layout() {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <StatusBar barStyle={'light-content'} backgroundColor={'black'} />
          <Stack />
          <Menu />
        </PersistGate>
      </Provider>
    </>
  );
}

export default Layout;
