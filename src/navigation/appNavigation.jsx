import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useQueryClient, QueryClientProvider, QueryClient } from '@tanstack/react-query';

import HomeScreen from '../screen/HomeScreen';
import LoginScreen from '../screen/Auth/loginScreen';
import RegisterScreen from '../screen/Auth/RegisterScreen';
import ProfileScreen from '../screen/ProfileScreen';
import SplashScreen from "../screen/SplashScreen";
import UserContextProvider from "../contexts/UserContext";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const queryClient = new QueryClient();

function HomeStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="HomeStack" component={HomeScreen} />
        </Stack.Navigator>
    );
}

function ProfileStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="ProfileStack" component={ProfileScreen} />
        </Stack.Navigator>
    );
}

function AppStack() {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name="HomeTab" component={HomeStack} />
            <Tab.Screen name="ProfileTab" component={ProfileStack} />
        </Tab.Navigator>
    );
}
function AuthStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Navigator>
    );
}

function AppNavigation() {
    const queryClient = useQueryClient();

    useEffect(() => {
        async function checkAuthentication() {
            // Replace this with your own logic to check if the user is authenticated
            const isValidToken = true;

            queryClient.setQueryData('token', isValidToken);
        }

        checkAuthentication();
    }, [queryClient]);

    return (
        <QueryClientProvider client={queryClient}>
            <UserContextProvider>
                <NavigationContainer>
                    <Stack.Navigator headerMode="none">
                        <Stack.Screen name="splash" component={SplashScreen} />
                        <Stack.Screen
                            name="Auth"
                            component={AuthStack}
                            options={{ gestureEnabled: true }} // Disable gestures for AppStack
                        />
                        <Stack.Screen
                            name="App"
                            component={AppStack}
                            options={{ gestureEnabled: true }}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </UserContextProvider>
        </QueryClientProvider>
    );
}

export default AppNavigation;
