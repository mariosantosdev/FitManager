import React, { useEffect, useState } from "react";
import { Pressable } from "react-native";

import { useNavigation } from '@react-navigation/native';

import NavigationUtils from "@utils/navigation";
import { ScreeName } from '@utils/contants';

import {
    Header,
    IconContainer,
    Icon,
    Text,
} from './styles';

export default function CustomHeader() {
    const navigation = useNavigation();
    const [title, setTitle] = useState('');

    useEffect(() => {
        const navigationUtil = new NavigationUtils(navigation);
        const focusScreen = navigationUtil.getFocusScreen() as ScreeName;
        setTitle(navigationUtil.getTitleScreen(focusScreen))

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