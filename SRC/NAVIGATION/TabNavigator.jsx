import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import ShopNavigator from './ShopNavigator'
import CartNavigator from './CartNavigator'
import ReceiptsNavigator from './ReceiptsNavigator'
import { StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { colors } from '../GLOBAL/colors'
import ProfileNavigator from './ProfileNavigator'
import MyPlaceNavigator from './MyPlacesNavigator'

const Tab = createBottomTabNavigator()

const TabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: styles.tabBar
            }} >
            <Tab.Screen name='Shop' component={ShopNavigator} options={{ tabBarIcon: ({ focused }) => (<Icon name="storefront" size={32} color={focused ? colors.negro : colors.gris} />) }} />
            <Tab.Screen name='Cart' component={CartNavigator} options={{ tabBarIcon: ({ focused }) => (<Icon name="shopping-cart" size={32} color={focused ? colors.negro : colors.gris} />) }} />
            <Tab.Screen name='Receipts' component={ReceiptsNavigator} options={{ tabBarIcon: ({ focused }) => (<Icon name="receipt" size={32} color={focused ? colors.negro : colors.gris} />) }} />
            <Tab.Screen name='Profile' component={ProfileNavigator} options={{ tabBarIcon: ({ focused }) => (<Icon name="account-circle" size={32} color={focused ? colors.negro : colors.gris} />) }} />
            <Tab.Screen name='Places' component={MyPlaceNavigator} options={{ tabBarIcon: ({ focused }) => (<Icon name="location-on" size={32} color={focused ? colors.negro : colors.gris} />) }} />
        </Tab.Navigator>
    )
}

export default TabNavigator

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: '#4A90E2', // Fondo azul
        height: 40,
        borderTopWidth: 1,
        borderTopColor: '#FFFFFF', // Borde blanco para contraste
        elevation: 10, // Sombra para Android
        shadowColor: '#000', // Sombra para iOS
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    tabIcon: {
        width: 30,
        height: 30,
        tintColor: '#000000', // Iconos en negro por defecto
    },
    tabIconFocused: {
        tintColor: '#FFFFFF', // Iconos blancos al estar enfocados
        transform: [{ scale: 1.2 }], // Efecto de zoom al enfocarse
    },
});
