import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignInScreen from '@screens/SignIn';

const Stack = createNativeStackNavigator();

export default function NavigatorAuthStack() {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
        }}>
            <Stack.Screen name="SignIn" component={SignInScreen} />
        </Stack.Navigator>
    );
}