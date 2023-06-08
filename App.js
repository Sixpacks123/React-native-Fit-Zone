import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'

import AppNavigation from "./src/navigation";


const queryClient = new QueryClient();

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>

            <AppNavigation/>
        </QueryClientProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
