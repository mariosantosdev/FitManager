import React from "react";
import { MaterialCommunityIcons } from '@expo/vector-icons';

import theme from "@utils/theme";

import {
    Container,
    Text,
} from './styles';

export type NameScreens = 'Home' | 'Weight' | 'Height' | 'Exercises' | 'Settings' | 'SignOut';

export interface ICustomDrawerItemProps {
    label: NameScreens;
    isActive?: boolean;
}

function GetIconFromNameScreen(nameScreen: NameScreens) {
    switch (nameScreen) {
        case 'Home':
            return 'home';

        case 'Weight':
            return 'weight';

        case 'Height':
            return 'human-male-height-variant';

        case 'Exercises':
            return 'dumbbell';

        case 'Settings':
            return 'cog';

        case 'SignOut':
            return 'logout-variant';

        default:
            return 'help';
    }
}

function GetTitleFromNameScreen(nameScreen: NameScreens) {
    switch (nameScreen) {
        case 'Home':
            return 'Início';

        case 'Weight':
            return 'Pesos';

        case 'Height':
            return 'Altura';

        case 'Exercises':
            return 'Exercícios';

        case 'Settings':
            return 'Configurações';

        case 'SignOut':
            return 'Sair';

        default:
            return '';
    }
}

export default function CustomDrawerItem(props: ICustomDrawerItemProps) {
    const { isActive, label } = props;

    return (
        <Container isActive={isActive}>
            <MaterialCommunityIcons
                size={28}
                color={isActive ? theme.colors.text.inLight : theme.colors.text.inDark}
                name={GetIconFromNameScreen(label)}
            />
            <Text isActive={isActive}>{GetTitleFromNameScreen(label)}</Text>
        </Container>
    );
}