import { FlatList, Image, Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import FlatCard from '../COMPONENTS/FlatCard';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useGetCategoriesQuery } from '../SERVICES/shopServices';
import { setCategory } from '../FEATURES/Shop/shopSlice';

const CategoriesScreen = ({ navigation }) => {
    const { width, height } = useWindowDimensions();
    const [isPortrait, setIsPortrait] = useState(true);
    const { data: categories, error, isLoading } = useGetCategoriesQuery();
    const dispatch = useDispatch();

    useEffect(() => {
        setIsPortrait(width > height ? false : true);
    }, [width, height]);

    const renderCategoryItem = ({ item, index }) => {
        return (
            <Pressable onPress={() => {
                dispatch(setCategory(item.title)); // Usar dispatch para setCategory
                navigation.navigate('Productos'); // Asegúrate de que la navegación a la pantalla de productos es correcta
            }}>
                <FlatCard style={index % 2 === 0 ? { ...styles.categoryItemContainer, ...styles.row } : { ...styles.categoryItemContainer, ...styles.rowReverse }}>
                    <Text style={styles.titleContainer}>{item.title}</Text>
                    <Image source={{ uri: item.image }} style={styles.image} resizeMode='contain' />
                </FlatCard>
            </Pressable>
        );
    };

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <Text>Cargando...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.categoriesContainer}>
                <Text>Error al cargar las categorías: {error.message}</Text> {/* Mostrar mensaje de error detallado */}
            </View>
        );
    }

    return (
        <View style={styles.categoriesContainer}>
            <FlatList
                data={categories}
                keyExtractor={item => item.id.toString()}
                renderItem={renderCategoryItem}
            />
        </View>
    );
};

export default CategoriesScreen;

const styles = StyleSheet.create({
    categoriesContainer: {
        flex: 1,
        backgroundColor: '#f4f4f4',
        paddingTop: 20,
    },
    categoryItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginVertical: 10,
        marginHorizontal: 15,
        padding: 15,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 8,
        overflow: 'hidden',
        position: 'relative',
        justifyContent: 'space-between',
    },
    row: {
        flexDirection: 'row',
    },
    rowReverse: {
        flexDirection: 'row-reverse',
    },
    titleContainer: {
        fontSize: 24,
        fontWeight: '700',
        color: '#ff007f',
        marginLeft: 20,
        textTransform: 'uppercase',
        letterSpacing: 1.2,
        flex: 1,
    },
    image: {
        width: 120,
        height: 120,
        borderRadius: 15,
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: '#00b5ad',
        padding: 5,
        margin: 5,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f4f4f4',
    },
});
