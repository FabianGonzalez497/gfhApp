import { useEffect, useState } from 'react'
import { Image, Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import products from '../DATA/products.json'
import { colors } from '../GLOBAL/colors'
import { useSelector, useDispatch } from 'react-redux';

const ProductScreen = ({ route }) => {

    const category = useSelector(state => state.shopReducer.value.categorySelected)


    const [productFound, setProductFound] = useState({})
    const { width, height } = useWindowDimensions() // Mueve esto fuera del bloque return

    const productId = route.params

    useEffect(() => {
        setProductFound(products.find(product => product.id === productId))
    }, [productId])

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.productContainer}>
                <Text style={styles.marcaContainer}> {productFound.marca} </Text>
                <Text style={styles.titleContainer}> {productFound.title} </Text>
                <Image
                    source={{ uri: productFound.image }}
                    alt={productFound.title}
                    style={styles.image} // Referencia al estilo específico para la imagen
                    resizeMode="contain" // Ajusta la imagen dentro de los límites, manteniendo la proporción
                />

                <Text style={styles.descriptionContainer}> {productFound.LongDescription} </Text>
                <Text style={styles.stock}>Stock: {productFound.stock}</Text>
                <Text style={styles.tag}>{productFound.tag}</Text>
                {
                    productFound.descuento > 0 && <Text style={styles.descuento}>Descuento: {productFound.descuento}% CON SU COMPRA EN EFECTIVO</Text>
                }
                <Text style={styles.precio}>${productFound.price}</Text>
                <Pressable style={styles.addToCartBtn} onPress={null} >
                    <Text style={styles.addToCart}> Agregar al Carrito </Text>
                </Pressable>
            </View>
        </ScrollView>
    )
}

export default ProductScreen

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1, // Para que el contenido se ajuste correctamente
        padding: 16, // Ajusta el padding según sea necesario
    },
    productContainer: {
        backgroundColor: '#f8f9fa', // Fondo gris claro
        padding: 15,
        margin: 15,
        borderWidth: 1,
        borderColor: '#e0e0e0', // Borde gris suave
        borderRadius: 15,
        shadowColor: '#000', // Sombra oscura
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 4,
    },
    image: {
        width: '100%', // Ocupa todo el ancho disponible del contenedor
        height: 200, // Altura fija
        alignSelf: 'center', // Centra la imagen horizontalmente
        padding:10,
        margin:10
    },
    marcaContainer: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333', // Color gris oscuro para la marca
        marginBottom: 5,
    },
    titleContainer: {
        fontSize: 18,
        fontWeight: '600',
        color: '#555', // Gris medio para el título
        marginBottom: 10,
    },
    descriptionContainer: {
        fontSize: 16,
        color: '#666', // Gris claro para la descripción
        marginBottom: 10,
        lineHeight: 22,
    },
    stock: {
        fontSize: 14,
        fontWeight: '600',
        color: '#40E0D0', // Color turquesa para el stock disponible
        marginBottom: 10,
    },
    tag: {
        fontSize: 14,
        color: '#000000', // Texto blanco para el tag
        backgroundColor: '#40E0D0', // Fondo turquesa para el tag
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 5,
        marginBottom: 10,
        alignSelf: 'flex-start',
    },
    descuento: {
        fontSize: 14,
        color: '#FF00FF', // Fucsia para el descuento
        fontWeight: 'bold',
        marginBottom: 10,
    },
    precio: {
        fontSize: 22,
        fontWeight: '700',
        color: '#333', // Color gris oscuro para el precio
        backgroundColor: '#D3D3D3', // Fondo gris claro para el precio
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10,
        alignSelf: 'flex-start',
        marginBottom: 15,
    },
    addToCartBtn: {
        backgroundColor: '#40E0D0', // Botón turquesa para agregar al carrito
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    addToCart: {
        color: '#fff', // Texto blanco para el botón
        fontSize: 16,
        fontWeight: 'bold',
    },
});