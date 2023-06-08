import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, KeyboardAvoidingView } from 'react-native';
import Button from '../../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import { register } from '../../service/service';

function RegisterScreen() {
    const [userData, setUserData] = useState({
        username: '',
        password: '',
        email: '',
        firstName: '',
        lastName: '',
        gender: '',
        age: '',
        height: '',
        weight: '',
        fitnessLevel: '',
    });
    const navigation = useNavigation();

    const handleInputChange = (field, value) => {
        setUserData(prevUserData => ({
            ...prevUserData,
            [field]: value,
        }));
    };

    const handleRegister = async () => {
        try {
            const { username, password, email, firstName } = userData;
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
                <Text style={styles.title}>Inscription</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Username'
                    onChangeText={value => handleInputChange('username', value)}
                    value={userData.username}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Password'
                    secureTextEntry
                    onChangeText={value => handleInputChange('password', value)}
                    value={userData.password}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Email'
                    onChangeText={value => handleInputChange('email', value)}
                    value={userData.email}
                />
                <TextInput
                    style={styles.input}
                    placeholder='First Name'
                    onChangeText={value => handleInputChange('firstName', value)}
                    value={userData.firstName}
                />
                {/* Add more fields as needed */}
                <View style={styles.button}>
                <Button
                    title='Register'
                    onPress={handleRegister}
                    disabled={!userData.username || !userData.password || !userData.email || !userData.firstName}
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
        flexDirection: 'column',
        width: '80%',
    }
});

export default RegisterScreen;
