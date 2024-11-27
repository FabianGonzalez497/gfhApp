import { StyleSheet, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { colors } from '../GLOBAL/colors'

const CameraIcon = () => {
    return (
        <View style={styles.iconContainer}>
            <Icon name='photo-camera' size={25} color="#fff" style={styles.icon} />
        </View>
    )
}

export default CameraIcon

const styles = StyleSheet.create({
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.negro,
        width: 48,
        height: 48,
        borderRadius: 24, // Ajustado para que sea perfectamente redondo
    }
})
