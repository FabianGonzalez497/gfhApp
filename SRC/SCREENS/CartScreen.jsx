import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import cart from '../DATA/cart.json'
import FlatCard from '../COMPONENTS/FlatCard'
import Icon from 'react-native-vector-icons/MaterialIcons'

const CartScreen = () => {

    const [total, setTotal] = useState(0);

    useEffect(() => {
        let acumulador = 0;
        if (cart && Array.isArray(cart) && cart.length > 0) {
            cart.forEach(item => {
                const price = Number(item.price);
                const quantity = Number(item.cantidad);
                if (!isNaN(price) && !isNaN(quantity)) {
                    acumulador += price * quantity;
                } else {
                    console.error("Error: item.price or item.cantidad is not a number:", item);
                }
            });
        } else {
            console.warn("Warning: Cart is empty or invalid.");
        }
        setTotal(acumulador);
    }, [cart]);

    const formatPrice = (price) => {
        return new Intl.NumberFormat('es-AR').format(price);
    }

    const FooterComponent = () => {
        return (
            <View style={styles.footerContainer}>
                <Text style={styles.footerTotal}>Total:${formatPrice(total)} </Text>
                <Pressable style={styles.confirmButton}>
                    <Text style={styles.confirmText}>Confirmar</Text>
                </Pressable>
            </View>
        )
    }
    const renderCartItem = ({ item }) => (
        <FlatCard style={styles.cartContainer} >
            <View>
                <Image source={{ uri: item.image }}
                    style={styles.cartImage}
                    resizeMode='contain'
                />
            </View>
            <View style={styles.cartDescription}>
                <Text style={styles.title}> {item.title} </Text>
                <Text style={styles.description}> {item.ShortDescription} </Text>
                <Text style={styles.price}>Precio UNITARIO: ${item.price} </Text>
                <Text style={styles.cantidad}>Cantidad: {item.cantidad}  </Text>
                <Text style={styles.total}>Total: ${item.cantidad * item.price}  </Text>
                <Icon name='delete' size={35} color="#FC7A5E" style={styles.trasIcon} />
            </View>
        </FlatCard>
    )

    return (
        <FlatList
            data={cart}
            keyExtractor={item => item.id}
            renderItem={renderCartItem}
            ListHeaderComponent={<Text style={styles.cartScreenTitle}> Tu carrito:  </Text>}
            ListFooterComponent={<FooterComponent />}
        />
    )
}

export default CartScreen

const styles = StyleSheet.create({
    cartContainer: {
        flexDirection: 'row',
        padding: 15,
        margin: 10,
        borderRadius: 10,
        backgroundColor: '#4A90E2', // Fondo azul
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    cartImage: {
        width: 150,
        height: 150,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#FFFFFF', // Blanco para contraste
        marginRight: 16,
    },
    cartDescription: {
        flex: 1,
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF', // Blanco para resaltar
        marginBottom: 4,
    },
    description: {
        fontSize: 14,
        color: '#D9EFFF', // Azul claro para suavidad
        marginBottom: 8,
    },
    price: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFC107', // Amarillo dorado para destacar
        marginBottom: 4,
    },
    cantidad: {
        fontSize: 14,
        fontWeight: '500',
        color: '#FFFFFF', // Blanco
        marginBottom: 4,
    },
    total: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#08D9D6', // Turquesa
        marginBottom: 4,
    },
    trasIcon: {
        alignSelf: 'flex-end',
        marginTop: 8,
        color: '#FF5C5C', // Rojo para el ícono de eliminar
    },
    cartScreenTitle: {
        fontSize: 30,
        fontFamily: 'title',
        textAlign: 'center',
        color: '#000000', // Blanco
        padding: 5,
        margin: 5,
    },
});

