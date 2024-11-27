import { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../GLOBAL/colors';
import CameraIcon from '../COMPONENTS/CameraIcon';
import { useSelector, useDispatch } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import { setProfilePicture } from '../FEATURES/AUTH/authSlice';
import { usePutProfilePictureMutation } from '../SERVICES/userServices';

const ProfileScreens = () => {
    const image = useSelector(state => state.auth.value.profilePicture);
    const user = useSelector(state => state.auth.value.email);
    const localId = useSelector(state => state.auth.value.localId);
    const dispatch = useDispatch();
    const [triggerPutProfilePicture, result] = usePutProfilePictureMutation();

    const verifyCameraPermissions = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        console.log("Camera permission status:", status);
        if (status !== 'granted') return false;
        return true;
    };

    const pickImage = async () => {
        const permissionOk = await verifyCameraPermissions();
        if (permissionOk) {
            console.log("Permisos concedidos para la cámara");
            let result = await ImagePicker.launchCameraAsync({
                mediaTypes: [ImagePicker.MediaType.All],
                allowsEditing: true,
                aspect: [1, 1],
                base64: true,
                quality: 0.7
            });
            console.log("Resultado de la cámara:", result);
            if (!result.canceled) {
                const base64Image = `data:image/jpeg;base64,${result.assets[0].base64}`;
                dispatch(setProfilePicture(base64Image));
                triggerPutProfilePicture({ image: base64Image, localId });
            }
        } else {
            console.log("Permisos denegados para la cámara");
        }
    };

    return (
        <LinearGradient
            colors={['#00CED1', '#C71585']}
            style={styles.profileContainer}>
            <View style={styles.imageProfileContainer}>
                {
                    image
                        ? <Image source={{ uri: image }} resizeMode='cover' style={styles.profileImage} />
                        : <Text style={styles.textProfilePlaceHolder} > {user?.charAt(0).toUpperCase()} </Text>
                }
                <Pressable onPress={pickImage} style={styles.cameraIcon}>
                    <CameraIcon />
                </Pressable>
            </View>
            <Text style={styles.profileData}> Email: {user} </Text>
        </LinearGradient>
    );
}

export default ProfileScreens;

const styles = StyleSheet.create({
    profileContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        borderWidth: 1,
        borderColor: colors.gris,
        borderRadius: 10,
        backgroundColor: colors.fondo,
    },
    imageProfileContainer: {
        width: 150,
        height: 150,
        borderRadius: 75,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.grisClaro,
        borderColor: colors.negro,
        borderWidth: 2,
        marginBottom: 20,
    },
    profileImage: {
        width: '100%',
        height: '100%',
        borderRadius: 75,
    },
    textProfilePlaceHolder: {
        fontSize: 60,
        color: colors.negro,
        fontWeight: 'bold',
    },
    profileData: {
        fontSize: 20,
        color: colors.blanco,
        marginTop: 15,
        backgroundColor: colors.gris,
        padding: 10,
        borderRadius: 10,
        textAlign: 'center',
    },
    cameraIcon: {
        position: 'absolute',
        bottom: 0,
        right: 0,
    },
});
