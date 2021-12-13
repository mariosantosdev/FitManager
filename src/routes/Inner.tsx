import React from 'react';
import { View } from 'react-native';

import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeScreen from '@screens/Home';
import WeightScreen from '@screens/Weight';

import CustomDrawer, { screenOptions } from '@components/Navigation/CustomDrawer';
import theme from '@utils/theme';

const Drawer = createDrawerNavigator();

export default function InnerDrawer() {
    return (
        <View style={{ flex: 1, backgroundColor: theme.colors.primary }}>
            <Drawer.Navigator
                screenOptions={screenOptions}
                drawerContent={props => <CustomDrawer {...props} />}
            >
                <Drawer.Screen
                    name="Home"
                    options={{ title: 'Início' }}
                    component={HomeScreen}
                />
                <Drawer.Screen
                    name="Weight"
                    options={{ title: 'Pesos' }}
                    component={WeightScreen}
                />
            </Drawer.Navigator>
        </View>
    );
}