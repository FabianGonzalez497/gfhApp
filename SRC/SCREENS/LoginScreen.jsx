import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useState, useEffect } from 'react';
import { useLoginMutation } from '../SERVICES/authService';
import { setUser } from '../FEATURES/AUTH/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [triggerLogin, result] = useLoginMutation();
    const dispatch = useDispatch();
    const navigation = useNavigation();

    useEffect(() => {
        if (result.status === "rejected") {
            // Manejo de errores aquí
        } else if (result.status === "fulfilled") {
            dispatch(setUser(result.data));
        }
    }, [result]);

    const onSubmit = () => {
        if (email && password) {
            triggerLogin({ email, password });
        } else {
            console.log("El email o la contraseña están incompletos.");
        }
    };

    return (
        <LinearGradient
            colors={['#C71585', '#00CED1']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradient}>
            <Text style={styles.title}> Grupo Ferreira Hogar </Text>
            <Text style={styles.subtitle}> Iniciar Sesión </Text>
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
            </View>
            <Pressable style={styles.btn} onPress={onSubmit}>
                <Text style={styles.btnText}> Iniciar Sesión </Text>
            </Pressable>
            <View style={styles.footTextContainer}>
                <Text style={styles.whiteText}> ¿No tienes una Cuenta? </Text>
                <Pressable onPress={() => navigation.navigate('Signup')}>
                    <Text style={styles.underLineText}>
                        Regístrate
                    </Text>
                </Pressable>
            </View>
        </LinearGradient>
    );
};

export default LoginScreen;

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
        color: '#EBEBEB', // Asegúrate de incluir el color aquí para la consistencia
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
});
