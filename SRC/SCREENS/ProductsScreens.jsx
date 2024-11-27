import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import FlatCard from '../COMPONENTS/FlatCard'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useGetProductsByCategoryQuery } from '../SERVICES/shopServices';
import Search from '../COMPONENTS/Search'

const ProductsScreens = ({ navigation }) => {
    const [productsFiltered, setProductsFiltered] = useState([]);
    const [search, setSearch] = useState("");
    const dispatch = useDispatch();

    const category = useSelector(state => state.shop.value.categorySelected);
    console.log("category:", category);

    const { data: productsFilteredByCategory, error, isLoading } = useGetProductsByCategoryQuery(category);
    console.log("products filtered:", productsFilteredByCategory);

    useEffect(() => {
        console.log("Response from Firebase:", productsFilteredByCategory); 
        if (productsFilteredByCategory) {
            setProductsFiltered(productsFilteredByCategory);
            if (search) {
                const filtered = productsFilteredByCategory.filter(
                    product => product.title.toLowerCase().includes(search.toLowerCase())
                );
                setProductsFiltered(filtered);
            }
        }
    }, [search, productsFilteredByCategory]);

    useEffect(() => {
        if (search && productsFilteredByCategory) {
            const filtered = productsFilteredByCategory.filter(
                product => product.title.toLowerCase().includes(search.toLowerCase())
            );
            setProductsFiltered(filtered);
        } else if (productsFilteredByCategory) {
            setProductsFiltered(productsFilteredByCategory);
        }
    }, [search, productsFilteredByCategory]);

    const renderProductItem = ({ item }) => {
        return (
            <Pressable onPress={() => navigation.navigate("Producto", item.id)}>
                <FlatCard style={styles.productContainer}>
                    <View>
                        <Image
                            source={{ uri: item.image }}
                            style={styles.productImage}
                            resizeMode="contain"
                        />
                    </View>
                    <View style={styles.descripciones}>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.description}>{item.ShortDescription}</Text>
                        <Text style={styles.stock}>Stock: {item.stock}</Text>
                        <Text style={styles.tag}>{item.tag}</Text>
                        {item.descuento > 0 && (
                            <Text style={styles.descuento}>
                                Descuento: {item.descuento}% CON SU COMPRA EN EFECTIVO
                            </Text>
                        )}
                        {item.stock <= 0 && (
                            <Text style={styles.noStock}>Sin Stock</Text>
                        )}
                        <Text style={styles.precio}>${item.price}</Text>
                    </View>
                </FlatCard>
            </Pressable>
        );
    };

    if (isLoading) {
        return (
            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                <Text>Cargando productos...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                <Text>Error al cargar productos: {error.message}</Text>
            </View>
        );
    }

    return (
        <>
            <Search setSearch={setSearch} />
            <FlatList
                data={productsFiltered}
                keyExtractor={item => item.id}
                renderItem={renderProductItem}
            />
        </>
    );
};

export default ProductsScreens

const styles = StyleSheet.create({
    productContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 10,
        padding: 15,
        borderRadius: 15,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    productImage: {
        width: 150,
        height: 150,
        borderRadius: 10,
        borderColor: '#00b5ad',  // Turquesa para los bordes de la imagen
        borderWidth: 2,
    },
    descripciones: {
        width: '50%',
    },
    title: {
        fontFamily: 'title',
        fontSize: 22,
        color: '#ff007f', // Fucsia para el título
        fontWeight: 'bold',
        marginBottom: 5,
    },
    description: {
        fontFamily: 'description',
        fontSize: 16,
        color: '#555',
        marginBottom: 10,
    },
    stock: {
        fontFamily: 'description',
        fontSize: 14,
        color: '#333',
        marginBottom: 5,
    },
    precio: {
        fontFamily: 'description',
        fontSize: 16,
        color: '#333',
        fontWeight: 'bold',
        marginTop: 10,
        backgroundColor: '#00b5ad', // Turquesa para el precio
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 10,
        textAlign: 'center',
    },
    descuento: {
        fontFamily: 'description',
        fontSize: 14,
        color: '#ff5722', // Naranja para el descuento
        fontWeight: 'bold',
        marginTop: 5,
    },
    tag: {
        fontFamily: 'tags',
        fontSize: 14,
        backgroundColor: '#ff007f', // Fucsia para los tags
        color: 'white',
        padding: 6,
        borderRadius: 12,
        textAlign: 'center',
        marginBottom: 10,
    },
});
