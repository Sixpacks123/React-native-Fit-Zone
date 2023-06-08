import * as React from 'react';
import { View, TextInput, StyleSheet, Text, KeyboardAvoidingView } from 'react-native';
import { useMutation } from '@tanstack/react-query';
import { login,user } from '../../service/service';
import Button from '../../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonActions, useNavigation} from "@react-navigation/native";
import userContext, {UserContext} from "../../contexts/UserContext";
import {useContext} from "react";

function LoginScreen() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const navigation = useNavigation();
    const { userData, setUserData } = useContext(UserContext);
    const mutation = useMutation(login, {
        onSuccess: async (data) => {
            // Save the authentication token to async storage
            const token = data;
            if (token) {
                setUserData({ token: token }); // Update userData with the token

                // Navigate to the home screen
                navigation.navigate('App', { screen: 'Home' });
            } else {
                alert('Token is null or undefined');
            }
        },
        onError: (error) => {
            alert(error.message);
        },
    });

    const handleEmailChange = (text) => {
        // Convert the input value to lowercase
        const lowercasedText = text.toLowerCase();
        setEmail(lowercasedText);
    };

    const handlePasswordChange = (text) => {
        setPassword(text);
    };

    const handlePress = () => {
        mutation.mutate({
            email,
            password,
        });
    };
    const handleRegister = () => {
        navigation.navigate('Register');
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <View style={styles.inner}>
                <Text style={styles.title}>FitZone</Text>
                {mutation.isError && (
                    <Text style={styles.errorText}>
                        An error occurred: {mutation.error.message}
                    </Text>
                )}
                <TextInput
                    style={styles.input}
                    placeholder='Email'
                    onChangeText={handleEmailChange}
                    defaultValue={email}
                    keyboardType='email-address'
                    autoCapitalize='none' // Disable auto-capitalization
                />
                <TextInput
                    style={styles.input}
                    placeholder='Password'
                    secureTextEntry
                    onChangeText={handlePasswordChange}
                    defaultValue={password}
                />
                <View style={styles.buttons}>
                    <Button
                        title='Connexion'
                        onPress={handlePress}
                        disabled={!email || !password}
                        loading={mutation.isLoading}
                    />
                    <Text style={styles.registerText}>
                        Vous n'avez pas de compte ?{' '}
                        <Text style={styles.registerLink} onPress={handleRegister}>
                            Inscrivez-vous
                        </Text>
                    </Text>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inner: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 20,
    },
    title: {
        fontSize: 64,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    errorText: {
        color: 'red',
        marginBottom: 16,
    },
    input: {
        width: '80%',
        padding: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    buttons: {
        width: '80%',

        flexDirection: 'column',
    },
    registerText: {
        marginTop: 16,
        fontSize: 11,
        textAlign: 'center',
    },
    registerLink: {
        color: 'blue',
        textDecorationLine: 'underline',

    },
});

export default LoginScreen;
