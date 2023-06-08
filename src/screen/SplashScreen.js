import React from 'react';
import { View } from 'react-native';
import LottieView from 'lottie-react-native';
import {useNavigation} from "@react-navigation/native";

export default function SplashScreen(props) {
    const navigation = useNavigation();

    return (
        <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
            <LottieView
                source={require('../assets/splash.json')}
                autoPlay

                loop={false}
                speed={2}
                onAnimationFinish={(isCanceled) => {
                    if (!isCanceled) {
                        navigation.navigate('Auth', { screen: 'Login' });
                    }
                }}
            />
        </View>
    );
}
