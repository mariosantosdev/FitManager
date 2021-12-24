import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignInScreen from '@screens/SignIn';
import SignUpScreen from '@screens/SignUp';
import ForgetPasswordScreen from '@screens/ForgetPassword';

const Stack = createNativeStackNavigator();

export default function NavigatorAuthStack() {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
        }}>
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="ForgetPassword" component={ForgetPasswordScreen} />
        </Stack.Navigator>
    );
}