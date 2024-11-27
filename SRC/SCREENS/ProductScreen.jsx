import { useEffect, useState } from 'react'
import { Image, Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import products from '../DATA/products.json'
import { colors } from '../GLOBAL/colors'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { addItem } from '../FEATURES/CART/cartSlice'

const ProductScreen = ({ route }) => {
    const category = useSelector(state => state.shop.value.categorySelected)
    const [productFound, setProductFound] = useState({})
    const { width, height } = useWindowDimensions()
    const productId = route.params

    useEffect(() => {
        setProductFound(products.find(product => product.id === productId))
    }, [productId])

    const dispatch = useDispatch()

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.productContainer}>
                <Text style={styles.marcaContainer}> {productFound.marca} </Text>
                <Text style={styles.titleContainer}> {productFound.title} </Text>
                <Image
                    source={{ uri: productFound.image }}
                    alt={productFound.title}
                    style={styles.image}
                    resizeMode="contain"
                />

                <Text style={styles.descriptionContainer}> {productFound.LongDescription} </Text>
                <Text style={styles.stock}>Stock: {productFound.stock}</Text>
                <Text style={styles.tag}>{productFound.tag}</Text>
                {
                    productFound.descuento > 0 && <Text style={styles.descuento}>Descuento: {productFound.descuento}% CON SU COMPRA EN EFECTIVO</Text>
                }
                <Text style={styles.precio}>${productFound.price}</Text>
                <Pressable style={styles.addToCartBtn} onPress={() => dispatch(addItem({ ...productFound, quantity: 1 }))} >
                    <Text style={styles.addToCart}> Agregar al Carrito </Text>
                </Pressable>
            </View>
        </ScrollView>
    )
}

export default ProductScreen

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        padding: 16,
    },
    productContainer: {
        backgroundColor: '#f8f9fa',
        padding: 15,
        margin: 15,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 4,
    },
    image: {
        width: '100%',
        height: 200,
        alignSelf: 'center',
        padding: 10,
        margin: 10,
    },
    marcaContainer: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    titleContainer: {
        fontSize: 18,
        fontWeight: '600',
        color: '#555',
        marginBottom: 10,
    },
    descriptionContainer: {
        fontSize: 16,
        color: '#666',
        marginBottom: 10,
        lineHeight: 22,
    },
    stock: {
        fontSize: 14,
        fontWeight: '600',
        color: '#40E0D0',
        marginBottom: 10,
    },
    tag: {
        fontSize: 14,
        color: '#FFFFFF',
        backgroundColor: '#40E0D0',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 5,
        marginBottom: 10,
        alignSelf: 'flex-start',
    },
    descuento: {
        fontSize: 14,
        color: '#FF00FF',
        fontWeight: 'bold',
        marginBottom: 10,
    },
    precio: {
        fontSize: 22,
        fontWeight: '700',
        color: '#333',
        backgroundColor: '#D3D3D3',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10,
        alignSelf: 'flex-start',
        marginBottom: 15,
    },
    addToCartBtn: {
        backgroundColor: '#40E0D0',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    addToCart: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
