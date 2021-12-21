import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';
import {
    useFonts,
    Roboto_300Light,
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold
} from '@expo-google-fonts/roboto';
import { NativeBaseProvider } from 'native-base'
import { ThemeProvider } from 'styled-components';

import UserContextProvider from '@contexts/user';
import theme, { nativeBaseTheme } from './src/utils/theme';
import Routes from './src/routes';

export default function App() {
    const [fontsLoaded] = useFonts({
        Roboto_300Light,
        Roboto_400Regular,
        Roboto_500Medium,
        Roboto_700Bold
    });

    if (!fontsLoaded) return <AppLoading />

    return (
        <ThemeProvider theme={theme}>
            <NativeBaseProvider theme={nativeBaseTheme}>
                <SafeAreaProvider>
                    <UserContextProvider>
                        <StatusBar style="auto" />
                        <Routes />
                    </UserContextProvider>
                </SafeAreaProvider>
            </NativeBaseProvider>
        </ThemeProvider>
    );
}
