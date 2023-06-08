import React from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';

export default function Button({ title, onPress, fullRound, adjustSize }) {
    const buttonStyles = [
        styles.button,
        fullRound && styles.fullRound,
        adjustSize && styles.adjustSize,
    ];

    return (
        <Pressable style={buttonStyles} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        width: '100%',
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#000000',
    },
    fullRound: {
        borderRadius: 100, // Utiliser une valeur suffisamment élevée pour obtenir un arrondi complet
    },
    adjustSize: {
        width: 'auto', // Ajuster la largeur en fonction du contenu
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
});
