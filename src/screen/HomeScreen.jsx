import React, {useContext, useEffect, useState} from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import userContext, {UserContext} from "../contexts/UserContext";
import {user} from "../service/service";

function HomeScreen() {
    const navigation = useNavigation();
    const { userData, setUserData } = useContext(UserContext); // Utiliser UserContext avec la bonne importation
    useEffect(() => {
        if (userData.token) {
            // Appeler la requête pour obtenir les informations de l'utilisateur
            user(userData.token )
                .then(response => {
                    // Mettre à jour les données de l'utilisateur dans le contexte
                    setUserData(prevData => ({
                        ...prevData,
                        ...response
                    }));                })
                .catch(error => {
                    console.log('Error fetching user data:', error);
                });
        }
    }, [userData.token, setUserData]);
    const handleLogout = async () => {
        try {
            navigation.navigate('Auth', { screen: 'Login' });
        } catch (error) {
            console.log('Error logging out:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Bienvenue sur l'application !</Text>
            <Text style={styles.text}>Votre token context est : {userData.token}</Text>
            <Text style={styles.text}>Votre token context est : {userData.lastName}</Text>


            <Button title="Déconnexion" onPress={handleLogout} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    text: {
        fontSize: 20,
        marginBottom: 10,
    },
});

export default HomeScreen;
