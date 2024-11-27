import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import MainNavigator from './SRC/NAVIGATION/MainNavigator';
//import TabNavigator from './SRC/NAVIGATION/TabNavigator';
import { Provider } from 'react-redux';
import { store } from './SRC/APP/store';

/* ME QUEDE EN CLASE 12 MIN   22' */

SplashScreen.preventAutoHideAsync();

export default function App() {

  const [loaded, error] = useFonts({
    'logo': require('../gfh/assets/FONTS/G.F.H.ttf'),
    'title': require('../gfh/assets/FONTS/Title.ttf'),
    'tags': require('../gfh/assets/FONTS/Tags.ttf'),
    'description': require('../gfh/assets/FONTS/Description.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }


  return (
    <Provider store={store}>
      <MainNavigator />
      <StatusBar style="auto" />
    </Provider>
  );
}


/*     "orientation": "portrait",

ESTO VA EN APP.JSON ES PARA LA ORIENTACION DEL CELULAR,
SI ES QUE ESTA VERTICAL U HORIZONTAL
*/