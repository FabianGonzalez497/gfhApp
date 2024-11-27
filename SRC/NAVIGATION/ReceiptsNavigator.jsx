import { createNativeStackNavigator } from "@react-navigation/native-stack"
import ReceiptsScreen from "../SCREENS/ReceiptsScreen"
import Header from "../COMPONENTS/Header"

const Stack = createNativeStackNavigator()

const ReceiptsNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ header:({route})=><Header subtitle={route.name}/>  }}>
            <Stack.Screen component={ReceiptsScreen} name="Recibos" />
        </Stack.Navigator>
    )
}

export default ReceiptsNavigator
