import {createNativeStackNavigator} from '@react-navigation/native-stack'
import ProfileScreens from '../SCREENS/ProfileScreens'
import Header from '../COMPONENTS/Header'

const Stack = createNativeStackNavigator()

const ProfileNavigator = ()=>(
    <Stack.Navigator
        screenOptions={{
            header:({route})=>(<Header title="Grupo Ferreira Hogar" subtitle={route.name} />)
        }}>
            <Stack.Screen name='Perfil' component={ProfileScreens} />
    </Stack.Navigator>
)

export default ProfileNavigator