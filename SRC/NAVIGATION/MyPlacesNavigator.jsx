import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MyPlacesScreen from '../SCREENS/MyPlacesScreen';
import Header from '../COMPONENTS/Header';

const Stack = createNativeStackNavigator();

const MyPlaceNavigator = () => (
    <Stack.Navigator
        screenOptions={{
            header: ({ route }) => <Header title="Grupo Ferreira Hogar" subtitle={route.name} />,
        }}
    >
        <Stack.Screen 
            name="Mis Lugares" 
            component={MyPlacesScreen} 
        />
    </Stack.Navigator>
);

export default MyPlaceNavigator;
