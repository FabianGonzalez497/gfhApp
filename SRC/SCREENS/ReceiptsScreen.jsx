import { FlatList, StyleSheet, Text, View } from 'react-native';
import FlatCard from '../COMPONENTS/FlatCard';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../GLOBAL/colors';
import { useGetReceiptsQuery } from '../SERVICES/receiptsService';

const dateOptions = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false };

const ReceiptsScreen = () => {
    const { data: receipts, error, isLoading } = useGetReceiptsQuery();

    const renderReceiptItem = ({ item }) => {
        let total = 0;
        if (Array.isArray(item.items)) {
            total = item.items.reduce((acumulador, item) => {
                const price = parseFloat(item.price);
                const quantity = parseInt(item.quantity, 10);
                if (!isNaN(price) && !isNaN(quantity)) {
                    return acumulador + (quantity * price);
                } else {
                    return acumulador;
                }
            }, 0);
        }

        const formattedTotal = total.toLocaleString('es-AR');
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

    if (isLoading) {
        return (
            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                <Text>Cargando recibos...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                <Text>Error al cargar recibos: {error.message}</Text>
            </View>
        );
    }

    return (
        <FlatList
            data={receipts}
            keyExtractor={item => item?.id?.toString() || Math.random().toString()} // Validación adicional
            renderItem={renderReceiptItem}
        />
    );
};

export default ReceiptsScreen;

const styles = StyleSheet.create({
    receiptContainer: {
        padding: 20,
        justifyContent: 'flex-start',
        margin: 15,
        gap: 10,
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
});
