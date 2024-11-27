import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import FlatCard from '../COMPONENTS/FlatCard';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem } from '../FEATURES/CART/cartSlice';
import { usePostReceiptMutation } from '../SERVICES/receiptsService';
import { clearCart } from '../FEATURES/CART/cartSlice';

const CartScreen = ({ navigation }) => {
    const cart = useSelector(state => state.cart.value.cartItems);
    const total = useSelector(state => state.cart.value.total);
    const dispatch = useDispatch();
    const [triggerPost, result] = usePostReceiptMutation();

    const formatPrice = (price) => {
        return new Intl.NumberFormat('es-AR').format(price);
    };

    const FooterComponent = () => {
        return (
            <View style={styles.footerContainer}>
                <Text style={styles.footerTotal}>Total: ${formatPrice(total)}</Text>
                <Pressable
                    style={styles.confirmButton}
                    onPress={() => {
                        triggerPost({ cart, total, createdAt: Date.now() });
                        dispatch(clearCart());
                        navigation.navigate("Recibos");
                    }}
                >
                    <Text style={styles.confirmText}>Confirmar</Text>
                </Pressable>
            </View>
        );
    };

    const renderCartItem = ({ item }) => (
        <FlatCard style={styles.cartContainer}>
            <View>
                <Image
                    source={{ uri: item.image }}
                    style={styles.cartImage}
                    resizeMode='contain'
                />
            </View>
            <View style={styles.cartDescription}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.ShortDescription}</Text>
                <Text style={styles.price}>Precio UNITARIO: ${item.price}</Text>
                <Text style={styles.cantidad}>Cantidad: {item.quantity}</Text>
                <Text style={styles.total}>Total: ${item.quantity * item.price}</Text>
                <Icon
                    name='delete'
                    size={35}
                    color="#FC7A5E"
                    style={styles.trasIcon}
                    onPress={() => dispatch(removeItem(item.id))}
                />
            </View>
        </FlatCard>
    );

    return (
        <FlatList
            data={cart}
            keyExtractor={item => item.id}
            renderItem={renderCartItem}
            ListHeaderComponent={<Text style={styles.cartScreenTitle}>Tu carrito:</Text>}
            ListFooterComponent={<FooterComponent />}
        />
    );
};

export default CartScreen;

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
    },
    cartScreenTitle: {
        fontSize: 30,
        fontFamily: 'title',
        textAlign: 'center',
        color: '#000000', // Negro
        padding: 5,
        margin: 5,
    },
    footerContainer: {
        alignItems: 'center',
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0', // Gris claro para el borde
        marginTop: 10,
    },
    footerTotal: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333', // Gris oscuro para el texto del total
    },
    confirmButton: {
        marginTop: 10,
        backgroundColor: '#00b5ad', // Color del botón de confirmar
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    confirmText: {
        color: '#FFFFFF', // Blanco para el texto del botón
        fontSize: 16,
        fontWeight: 'bold',
    },
});
