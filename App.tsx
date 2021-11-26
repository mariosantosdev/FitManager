import 'dayjs/locale/pt-br';

import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';
import {
    useFonts,
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
} from '@expo-google-fonts/poppins';
import { NativeBaseProvider } from 'native-base'
import { ThemeProvider } from 'styled-components';

import theme, { nativeBaseTheme } from './src/utils/theme';
import Routes from './src/routes';

export default function App() {
    const [fontsLoaded] = useFonts({
        Poppins_300Light,
        Poppins_400Regular,
        Poppins_500Medium,
        Poppins_700Bold
    });

    if (!fontsLoaded) return <AppLoading />

    return (
        <ThemeProvider theme={theme}>
            <NativeBaseProvider theme={nativeBaseTheme}>
                <SafeAreaProvider>
                    <StatusBar style="auto" />
                    <Routes />
                </SafeAreaProvider>
            </NativeBaseProvider>
        </ThemeProvider>
    );
}
