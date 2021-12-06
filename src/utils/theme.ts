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
            500: colors.primary
        }
    },
    fonts
})

export default {
    colors,
    fonts,
};

