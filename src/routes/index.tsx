import React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import Inner from './Inner';

export default function Routes() {
    return (
        <NavigationContainer>
            <Inner />
        </NavigationContainer>
    )
}