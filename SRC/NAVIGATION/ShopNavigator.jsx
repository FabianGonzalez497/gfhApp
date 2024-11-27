import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CategoriesScreen, ProductsScreens, ProductScreen } from "../SCREENS";
import Header from "../COMPONENTS/Header";

const Stack = createNativeStackNavigator(); 

const ShopNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{header:({route})=><Header subtitle={route.name} />}}>
            <Stack.Screen name="Categorias" options={{ title: 'Categorias' }} component={CategoriesScreen} />
            <Stack.Screen name="Productos" options={{ title: 'Productos' }} component={ProductsScreens} />
            <Stack.Screen name="Producto" options={{ title: 'Detalles' }} component={ProductScreen} />
        </Stack.Navigator>
    );
};

export default ShopNavigator;
