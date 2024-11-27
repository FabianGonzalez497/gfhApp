import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useState, useEffect } from 'react';
import { useSignupMutation } from '../SERVICES/authService';
import { setUser } from '../FEATURES/AUTH/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import ProfileScreens from './ProfileScreens';

const SignupScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [triggerSignup, result] = useSignupMutation();
    const dispatch = useDispatch();
    const navigation = useNavigation();

    useEffect(() => {
        if (result.status === "rejected") {
            console.log("Error al registrar: ", result.error);
        } else if (result.status === "fulfilled") {
            console.log("Registro exitoso: ", result.data);
            if (result.data && result.data.email && result.data.idToken) {
                dispatch(setUser({ email: result.data.email, token: result.data.idToken }));
                navigation.navigate('ProfileScreens'); // Redirigir después de iniciar sesión
            }
        }
    }, [result, dispatch, navigation]);

    const onSubmit = () => {
        if (email && password === confirmPassword) {
            triggerSignup({ email, password });
        } else {
            console.log("Las contraseñas no coinciden o el email está incompleto.");
        }
    };

    return (
        <LinearGradient
            colors={['#00CED1', '#C71585']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradient}>
            <Text style={styles.title}> Grupo Ferreira Hogar </Text>
            <Text style={styles.subtitle}> Registrate </Text>
            <View style={styles.inputContainer}>
                <TextInput
                    onChangeText={(text) => setEmail(text)}
                    placeholderTextColor='black'
                    placeholder='Email'
                    style={styles.TextInput}
                />
                <TextInput
                    onChangeText={(text) => setPassword(text)}
                    placeholderTextColor='black'
                    placeholder='Contraseña'
                    style={styles.TextInput}
                    secureTextEntry
                />
                <TextInput
                    onChangeText={(text) => setConfirmPassword(text)}
                    placeholderTextColor='black'
                    placeholder='Repetir Contraseña'
                    style={styles.TextInput}
                    secureTextEntry
                />
            </View>
            <View style={styles.footTextContainer}>
                <Text style={styles.whiteText}> ¿No tienes una Cuenta? </Text>
                <Pressable onPress={() => navigation.navigate('Login')}>
                    <Text style={{ ...styles.whiteText, ...styles.underLineText }}>
                        Crea una
                    </Text>
                </Pressable>
            </View>

            <Pressable style={styles.btn} onPress={onSubmit}>
                <Text style={styles.btnText}> Crear una Cuenta </Text>
            </Pressable>

            <View style={styles.guestOptionContainer}>
                <Text style={styles.whiteText}> ¿Solo quieres dar un vistazo? </Text>
                <Pressable onPress={() => {
                    dispatch(setUser({ email: "demo@gfh.com", token: "demo" }));
                    navigation.navigate('ProfileScreens'); // Redirigir después de iniciar sesión
                }}>
                    <Text style={{ ...styles.whiteText, ...styles.strongText }}>
                        Ingresar como Invitado
                    </Text>
                </Pressable>
            </View>
        </LinearGradient>
    );
}

export default SignupScreen;

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontFamily: 'logo',
        fontSize: 32,
        color: '#FFFFFF',
        marginBottom: 10,
        textAlign: 'center',
    },
    subtitle: {
        fontFamily: 'title',
        fontSize: 24,
        color: '#EBEBEB',
        marginBottom: 20,
        textAlign: 'center',
    },
    inputContainer: {
        width: '80%',
        marginBottom: 20,
        alignItems: 'center',
    },
    TextInput: {
        height: 50,
        borderColor: '#CCCCCC',
        borderWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 10,
        color: '#11001b',
        backgroundColor: '#E0E0E0',
        borderRadius: 5,
        width: '100%',
        textAlign: 'center',
    },
    footTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    whiteText: {
        color: '#EBEBEB',
    },
    underLineText: {
        textDecorationLine: 'underline',
        marginLeft: 5,
    },
    btn: {
        width: '50%',
        height: 50,
        backgroundColor: '#C71585',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginBottom: 20,
    },
    btnText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    guestOptionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    strongText: {
        fontWeight: 'bold',
        marginLeft: 5,
    },
});
