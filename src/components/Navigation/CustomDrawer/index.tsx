import React, { useContext } from "react";
import { Pressable, View } from "react-native";

import {
    DrawerContentScrollView,
    DrawerNavigationOptions,
    DrawerContentComponentProps
} from '@react-navigation/drawer';

import CustomDrawerItem from '@components/Navigation/CustomDrawerItem';
import GenerateAvatar from "@utils/gravatar";
import { ScreeName } from "@utils/contants";

import {
    Container,
    Header,
    HeaderTexts,
    Name,
    Avatar,
    Email,
    ListItems,
} from './styles';
import { clearStorageToken } from "@utils/asyncStorage";
import { UserContext } from "@contexts/user";

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
    const { user } = useContext(UserContext);
    const { signOut } = useContext(UserContext).actions;

    function getFocusScreen() {
        const index = navigation.getState().index;
        return navigation.getState().routes[index].name as ScreeName;
    }

    async function handleSignOut() {
        await clearStorageToken();
        signOut();
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
                        <CustomDrawerItem
                            label='Home'
                            isActive={getFocusScreen() === 'Home'}
                        />
                    </Pressable>

                    {/* Weight Screen */}
                    <Pressable onPress={() => navigation.jumpTo('Weight')}>
                        <CustomDrawerItem
                            label='Weight'
                            isActive={getFocusScreen() === 'Weight'}
                        />
                    </Pressable>

                    {/* Height Screen */}
                    <Pressable onPress={() => navigation.jumpTo('Height')}>
                        <CustomDrawerItem
                            label='Height'
                            isActive={getFocusScreen() === 'Height'}
                        />
                    </Pressable>

                    {/* Exercises Screen */}
                    <Pressable onPress={() => navigation.jumpTo('Exercises')}>
                        <CustomDrawerItem
                            label='Exercises'
                            isActive={getFocusScreen() === 'Exercises'}
                        />
                    </Pressable>
                </ListItems>

                <View>
                    {/* Settings Screen */}
                    <Pressable onPress={() => navigation.jumpTo('Settings')}>
                        <CustomDrawerItem
                            label='Settings'
                            isActive={getFocusScreen() === 'Settings'}
                        />
                    </Pressable>

                    {/* SignOut Action */}
                    <Pressable onPress={handleSignOut}>
                        <CustomDrawerItem
                            label='SignOut'
                        />
                    </Pressable>

                </View>
            </Container>
        </DrawerContentScrollView>
    )
}