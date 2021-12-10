import React, { useEffect, useState } from "react";
import { Pressable } from "react-native";

import { useNavigation } from '@react-navigation/native';

import { screens, ScreeName } from '@utils/contants';

import {
    Header,
    IconContainer,
    Icon,
    Text,
} from './styles';

export default function CustomHeader() {
    const navigation = useNavigation();
    const { routes, index } = navigation.getState();
    const [title, setTitle] = useState('');

    function getFocusScreen(index: number) {
        return routes[index].name;
    }

    function getTitleScreen(screename: ScreeName) {
        return screens.filter((screen) => screen.name === screename)[0].title;
    }

    useEffect(() => {
        const focusScreen = getFocusScreen(index) as ScreeName;
        setTitle(getTitleScreen(focusScreen))

        return () => setTitle('');
    }, []);

    return (
        <Header>
            <IconContainer>
                <Pressable onPress={() => navigation?.toggleDrawer()}>
                    <Icon name="menu" />
                </Pressable>
            </IconContainer>
            <Text>{title}</Text>
        </Header>
    )
}