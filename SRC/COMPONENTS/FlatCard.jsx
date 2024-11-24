import { StyleSheet, Text, View } from 'react-native'
import { colors } from '../GLOBAL/colors'

const FlatCard = ({ children, style }) => {
    return (
        <View style={{ ...styles.cardContainer, ...style }}>
            {children}
        </View>
    )
}

export default FlatCard

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: colors.fondoCard,
        shadowColor: colors.sombra,
        shadowOpacity: 1,
        shadowRadius: 1,
        shadowOffset: { width: 3, height: 5 },
        elevation: 5
    }
})