import { extendTheme } from 'native-base';

const colors = {
    primary: '#9C9AED',
    variations: {
        color01: '#D8315B',
        color02: '#3E92CC',
        color03: '#07D962',
        color04: '#5D5FEF',
        color05: '#EF5DA8',
    },

    text: {
        inLight: '#1E1B18',
        inDark: '#FAFAFA',
    },
    background: {
        light: '#FFFAFF',
        dark: '#1E1E26'
    }
}

const fonts = {
    light: 'Roboto_300Light',
    regular: 'Roboto_400Regular',
    medium: 'Roboto_500Medium',
    bold: 'Roboto_700Bold'
}

export const nativeBaseTheme = extendTheme({
    colors: {
        primary: {
            50: '#e9e9ff',
            100: '#bfbff8',
            200: '#9694ed',
            300: '#6d69e3',
            400: '#433eda',
            500: colors.primary,
            600: '#1f1d97',
            700: '#15136d',
            800: '#0b0b43',
            900: '#04031c',
        }
    },
    fonts
})

export default {
    colors,
    fonts,
};

