import { FlatList, StyleSheet, Text, View } from 'react-native'
import receipts from '../DATA/receipts.json'
import FlatCard from '../COMPONENTS/FlatCard'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { colors } from '../GLOBAL/colors'

const dateOptions = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false }

const ReceiptsScreen = () => {
    const renderReceiptItem = ({ item }) => {
        // Calcular el total de la compra, asegurándonos de que price y quantity sean números
        let total = item.items.reduce((acumulador, item) => {
            const price = parseFloat(item.price); // Convertir el precio a número
            const quantity = parseInt(item.quantity, 10); // Convertir la cantidad a número entero
            if (!isNaN(price) && !isNaN(quantity)) {
                return acumulador + (quantity * price);
            } else {
                return acumulador; // Si hay un valor no válido, no sumamos
            }
        }, 0);


        // Formatear el total con puntos como separadores de miles
        const formattedTotal = total.toLocaleString('es-AR');

        // Convertir el timestamp `createdAt` a una fecha legible
        const createdAtDate = new Date(item.createdAt).toLocaleString('es-AR', dateOptions);

        return (
            <FlatCard style={styles.receiptContainer}>
                <Text style={styles.title}>Recibo N° {item.id} </Text>
                <Text style={styles.date}>Creado el {createdAtDate}hs</Text>
                <Text style={styles.total}>Total: {formattedTotal} </Text>
                <Icon name="visibility" size={24} color={colors.gris} style={styles.viewIcon} />
            </FlatCard>
        );
    };


    return (
        <FlatList
            data={receipts}
            keyExtractor={item => item.id.toString()}
            renderItem={renderReceiptItem}
        />
    )
}

export default ReceiptsScreen

const styles = StyleSheet.create({
    receiptContainer: {
        padding: 20,
        justifyContent: 'flex-start',
        margin: 15,
        gap: 10
    },
    title: {
        fontWeight: '700',
    },
    date: {
        fontSize: 14,
        color: colors.gris,
    },
    total: {
        fontSize: 16,
        fontWeight: '700',
    },
    viewIcon: {
        alignSelf: 'flex-end',
    }
})
