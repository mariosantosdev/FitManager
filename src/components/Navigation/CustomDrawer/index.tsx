import React from "react";
import { Pressable, View } from "react-native";

import {
    DrawerContentScrollView,
    DrawerNavigationOptions,
    DrawerContentComponentProps
} from '@react-navigation/drawer';

import CustomDrawerItem from '@components/Navigation/CustomDrawerItem';
import GenerateAvatar from "@utils/gravatar";

import {
    Container,
    Header,
    HeaderTexts,
    Name,
    Avatar,
    Email,
    ListItems,
} from './styles';

export const screenOptions: DrawerNavigationOptions = {
    drawerType: 'slide',
    overlayColor: 'transparent',
    drawerStyle: {
        flex: 1,
        width: '70%',
        paddingRight: 20,
        backgroundColor: 'transparent',
    },
    sceneContainerStyle: {
        backgroundColor: 'transparent',
    },
    headerShown: false,
}

export default function CustomDrawer(props: DrawerContentComponentProps) {
    const { navigation } = props;

    const user = {
        name: 'Ana Flávia',
        email: 'anaflavia@email.com'
    }

    const gravatarURI = GenerateAvatar(user.name);

    return (
        <DrawerContentScrollView
            scrollEnabled
            contentContainerStyle={{ flex: 1 }}
        >
            <Container>
                <Header>
                    <Avatar source={{ uri: gravatarURI }} />
                    <HeaderTexts>
                        <Name>{user.name}</Name>
                        <Email>{user.email}</Email>
                    </HeaderTexts>
                </Header>

                <ListItems>
                    {/* Home Screen */}
                    <Pressable onPress={() => navigation.jumpTo('Home')}>
                        <CustomDrawerItem label='Home' />
                    </Pressable>

                    {/* Weight Screen */}
                    <Pressable onPress={() => navigation.jumpTo('Weight')}>
                        <CustomDrawerItem label='Weight' />
                    </Pressable>

                    {/* Height Screen */}
                    <Pressable onPress={() => navigation.jumpTo('Height')}>
                        <CustomDrawerItem label='Height' />
                    </Pressable>

                    {/* Exercises Screen */}
                    <Pressable onPress={() => navigation.jumpTo('Exercises')}>
                        <CustomDrawerItem label='Exercises' />
                    </Pressable>
                </ListItems>

                <View>
                    {/* Settings Screen */}
                    <Pressable onPress={() => navigation.jumpTo('Settings')}>
                        <CustomDrawerItem label='Settings' />
                    </Pressable>

                    {/* SignOut Action */}
                    <Pressable onPress={() => { }}>
                        <CustomDrawerItem label='SignOut' />
                    </Pressable>

                </View>
            </Container>
        </DrawerContentScrollView>
    )
}