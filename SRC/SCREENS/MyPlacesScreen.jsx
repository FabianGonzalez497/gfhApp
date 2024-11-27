import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, Pressable, FlatList } from 'react-native';
import * as Location from 'expo-location';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../GLOBAL/colors';
import Toast from 'react-native-toast-message';
import MapView, { Marker } from 'react-native-maps';
import FlatCard from '../COMPONENTS/FlatCard';
import { geocoding_api_key } from '../FIREBASE/database';

export default function App() {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [title, setTitle] = useState("");
    const [places, setPlaces] = useState([]);
    const [address, setAddress] = useState("");

    const showToast = (type, message) => {
        Toast.show({
            type: type,
            text1: message,
            visibilityTime: 2000,
        });
    };

    const renderPlaceItem = ({ item }) => (
        <FlatCard style={styles.placeContainer}>
            <View style={styles.mapContainer}>
                <MapView 
                    style={styles.map}
                    initialRegion={{
                        latitude: item.coords.latitude,
                        longitude: item.coords.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >
                    <Marker 
                        coordinate={{ 
                            latitude: item.coords.latitude, 
                            longitude: item.coords.longitude 
                        }} 
                        title={item.title} 
                    />
                </MapView>
            </View>
            <View style={styles.placeDescriptionContainer}>
                <Text style={styles.mapTitle}>{item.title}</Text>
                <Text style={styles.address}>{item.address}</Text>
            </View>
        </FlatCard>
    );

    const getPermissions = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            return false;
        }
        return true;
    };

    const getLocation = async () => {
        const permissionOk = await getPermissions();
        if (!permissionOk) {
            setErrorMsg('Permiso para acceder a la ubicación fue denegado');
            showToast('error', 'Error, No se concedieron los permisos');
        } else {
            let location = await Location.getCurrentPositionAsync({});
            if (location) {
                const response = await fetch(
                    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.coords.latitude},${location.coords.longitude}&key=${geocoding_api_key}`
                );
                const data = await response.json();
                console.log(data);
                if (data.status === 'OK') {
                    const formattedAddress = data.results[0].formatted_address;
                    setAddress(formattedAddress);
                } else {
                    console.log('Error en geocodificación inversa:', data.error_message);
                }
                showToast('success', '¡Ubicación obtenida!');
                console.log(location.coords);
                setLocation(location.coords);
            } else {
                setErrorMsg('Error al obtener la ubicación');
                showToast('error', 'Error al obtener la ubicación');
            }
        }
    };

    const savePlace = () => {
        if (location) {
            setPlaces(prevState => [
                ...prevState,
                { id: Math.random().toString(), title, coords: location, address }
            ]);
            showToast('success', '¡Lugar guardado!');
        } else {
            showToast('error', 'Primero obtén la ubicación');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Ubicaciones:</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Ingresa un título"
                    onChangeText={(text) => setTitle(text)}
                />
                <Pressable onPress={getLocation}>
                    <Icon name="location-on" color={colors.fuxia} size={25} />
                </Pressable>
                <Pressable onPress={savePlace}>
                    <Icon name="add-circle" color={colors.turquesa} size={30} />
                </Pressable>
            </View>
            <Text style={styles.subtitle}>Tus lugares favoritos:</Text>
            <FlatList
                data={places}
                keyExtractor={item => item.id}
                renderItem={renderPlaceItem}
            />
            <Toast />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginVertical: 16,
    },
    subtitle: {
        fontSize: 22,
        color: 'black',
    },
    inputContainer: {
        paddingVertical: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 20,
        padding: 10,
        width: '70%',
        backgroundColor: '#fff',
    },
    placesContainer: {
        marginTop: 16,
    },
    placeContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        padding: 16,
        margin: 4,
        gap: 24,
    },
    mapContainer: {
        height: 120,
        width: 120,
        borderRadius: 75,
        overflow: 'hidden',
        elevation: 5,
    },
    map: {
        width: 120,
        height: 120,
    },
    mapTitle: {
        fontWeight: '700',
    },
    placeDescriptionContainer: {
        width: '60%',
        padding: 8,
    },
    address: {
        fontStyle: 'italic',
    },
});
