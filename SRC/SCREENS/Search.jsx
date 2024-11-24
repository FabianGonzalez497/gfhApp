import { StyleSheet, TextInput } from 'react-native'
import { colors } from '../GLOBAL/colors'

const Search = ({setSearch}) => {
    return (
        <TextInput 
            placeholder="Buscar..." 
            onChangeText={(text) => setSearch(text)} 
            style={styles.searchInput} 
        />
    )
}

export default Search

const styles = StyleSheet.create({
    searchInput: {
        padding: 5,
        margin: 5,
        borderWidth: 1,
        borderColor: colors.fondo,
        borderRadius: 5,
    }
})
