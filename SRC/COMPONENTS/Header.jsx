import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Header = ({subtitle}) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.backgroundAccent} />
      <Text style={styles.title}>Grupo Ferreira Hogar</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4A90E2', // Fondo principal azul
    borderBottomWidth: 2,
    borderBottomColor: '#2E5C9A',
    elevation: 5, // Sombra para Android
    shadowColor: '#000', // Sombra para iOS
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    position: 'relative',
    overflow: 'hidden', // Recortar elementos decorativos
  },
  backgroundAccent: {
    position: 'absolute',
    top: 0,
    left: -50,
    width: 300,
    height: 150,
    backgroundColor: '#2E5C9A', // Azul más oscuro
    borderRadius: 150, // Círculo
    opacity: 0.7,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#FFFFFF', // Blanco para contraste
    textShadowColor: '#00000050', // Sombra en el texto
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    textTransform: 'uppercase',
    letterSpacing: 3,
  },
  subtitle:{
    fontFamily:'title',
    fontSize:20,
    left:'35%'
  }
});
