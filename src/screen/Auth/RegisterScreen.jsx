import React, { useState } from 'react';
import {View, TextInput, StyleSheet, Text, KeyboardAvoidingView, TouchableOpacity, Platform} from 'react-native';
import Button from '../../components/Button';
import { useNavigation } from '@react-navigation/native';
import { register } from '../../service/service';

function RegisterScreen() {
    const [userData, setUserData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        firstName: '',
        lastName: '',
    });
    const navigation = useNavigation();

    const handleInputChange = (field, value) => {
        if (field === 'confirmPassword') {
            setUserData(prevUserData => ({
                ...prevUserData,
                confirmPassword: value,
            }));
        } else {
            setUserData(prevUserData => ({
                ...prevUserData,
                [field]: value,
            }));
        }
    };
    const handleGoBack = () => {
        navigation.goBack();
    };
    const handleRegister = async () => {
        try {
            const { username, password, confirmPassword, email, firstName } = userData;

            if (password !== confirmPassword) {
                alert('Password and Confirm Password do not match');
                return;
            }

            await register({ username, password, email, firstName });
            navigation.navigate('Auth', { screen: 'Login' });
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >

            <View style={styles.inner}>
                <View style={styles.header}>
                    <Button onPress={handleGoBack} title="<" fullRound adjustSize/>
                    <Text style={styles.title}>Inscription</Text>
                </View>
                <TextInput
                    style={styles.input}
                    placeholder="Pseudo"
                    onChangeText={value => handleInputChange('username', value)}
                    value={userData.username}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Mail"
                    onChangeText={value => handleInputChange('email', value)}
                    value={userData.email}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Prénom"
                    onChangeText={value => handleInputChange('firstName', value)}
                    value={userData.firstName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Mot de passe"
                    secureTextEntry
                    onChangeText={value => handleInputChange('password', value)}
                    value={userData.password}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Confirmation mot de passe"
                    secureTextEntry
                    onChangeText={value => handleInputChange('confirmPassword', value)}
                    value={userData.confirmPassword}
                />
                <View style={styles.button}>
                    <Button
                        title="S'inscire"
                        onPress={handleRegister}
                        disabled={
                            !userData.username ||
                            !userData.password ||
                            !userData.confirmPassword ||
                            !userData.email ||
                            !userData.firstName
                        }
                    />
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
        fontSize: 24,
        fontWeight: 'bold',
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
    button: {
        width: '80%',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
});

export default RegisterScreen;
