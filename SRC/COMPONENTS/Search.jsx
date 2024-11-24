import { StyleSheet, TextInput, View } from 'react-native';

const Search = ({ setSearch }) => {
    return (
        <View style={styles.searchContainer}>
            <TextInput 
                placeholder='Buscar...'
                onChangeText={text => setSearch(text)}
                style={styles.searchInput}
            />
        </View>
    );
}

export default Search;

const styles = StyleSheet.create({
    searchContainer: {
        padding: 10,
        backgroundColor: '#f4f4f4',
    },
    searchInput: {
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
    },
});
